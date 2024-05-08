import { SubmitHandler, useForm } from "react-hook-form";
import { Container, Title, Input, ContainerForm, Button } from "./styles";
import { ErrorMessage } from "@hookform/error-message";
import Alert from "@mui/material/Alert";
import { useState } from "react";

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
};

export function Footer() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    setFormSubmitted(true);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <Container id="contato">
      <Title>
        Ficou com dúvida? <br /> Nós entramos em contato com você
      </Title>

      <ContainerForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Como gostaria de ser chamado?"
          {...register("name", {
            required: "O campo é obrigatório",
            maxLength: 40,
          })}
        ></Input>
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => (
            <span style={{ color: "#D10202", fontSize: "14px" }}>
              {message}
            </span>
          )}
        />

        <Input
          placeholder="Em qual empresa você trabalha?"
          {...register("company", {
            required: "O campo é obrigatório",
            maxLength: 40,
          })}
        ></Input>
        <ErrorMessage
          errors={errors}
          name="company"
          render={({ message }) => (
            <span style={{ color: "#D10202", fontSize: "14px" }}>
              {message}
            </span>
          )}
        />

        <Input
          placeholder="Digite aqui o seu email?"
          {...register("email", {
            required: "O campo é obrigatório",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Digite um email válido",
            },
            maxLength: 40,
          })}
        ></Input>
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => (
            <span style={{ color: "#D10202", fontSize: "14px" }}>
              {message}
            </span>
          )}
        />

        <Input
          placeholder="Qual o seu telefone?"
          {...register("phone", { required: "O campo é obrigatório" })}
        ></Input>
        <ErrorMessage
          errors={errors}
          name="phone"
          render={({ message }) => (
            <span style={{ color: "#D10202", fontSize: "14px" }}>
              {message}
            </span>
          )}
        />

        {formSubmitted && showAlert && (
          <Alert severity="success">Dados enviados com sucesso!</Alert>
        )}

        <Button type="submit">ENVIAR</Button>
      </ContainerForm>
    </Container>
  );
}
