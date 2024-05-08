import { Container, Title, Input, ContainerForm, Button } from "./styles";

export function Footer() {
  return (
    <Container id="contato">
      <Title>
        Ficou com dúvida? <br /> Nós entramos em contato com você
      </Title>

      <ContainerForm>
        <Input placeholder="Como gostaria de ser chamado?"></Input>
        <Input placeholder="Em qual empresa você trabalha?"></Input>
        <Input placeholder="Digite aqui o seu email?"></Input>
        <Input placeholder="Qual o seu telefone?"></Input>

        <Button>ENVIAR</Button>
      </ContainerForm>
    </Container>
  );
}
