import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface DataItem {
  datetime: string;
  max: number;
}

interface FetchDataArg {
  url: string;
  seriesName: string;
  color: string;
}

interface ChartSeries {
  seriesName: string;
  data: { x: number; y: number }[];
  color: string;
}

interface ChartState {
  data: ChartSeries[];
  loading: boolean;
  error: string | null;
}

// Thunk para buscar dados
export const fetchData = createAsyncThunk<
  ChartSeries,
  FetchDataArg,
  { rejectValue: string }
>(
  "chartData/fetchData",
  async ({ url, seriesName, color }, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ data: DataItem[] }>(url);
      const data = response.data.data.map((item) => ({
        x: new Date(item.datetime).getTime(),
        y: item.max,
      }));
      return { seriesName, data, color };
    } catch (error: unknown) {
      const axiosError = error as AxiosError; // Aserção para AxiosError
      if (axiosError.response && axiosError.response.data) {
        // Certifique-se de que está tratando a resposta como uma string.
        return rejectWithValue(axiosError.response.data as string);
      } else {
        // Trata erros que não são específicos do axios, como problemas de rede
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

const chartDataSlice = createSlice({
  name: "chartData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  } as ChartState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchData.fulfilled,
        (state, action: PayloadAction<ChartSeries>) => {
          state.data.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(
        fetchData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.error = action.payload ?? "Failed to load data";
          state.loading = false;
        }
      );
  },
});

export default chartDataSlice.reducer;
