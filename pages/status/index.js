import useSWR from "swr";

async function fetchAPI(APIurl) {
  const response = await fetch(APIurl);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  let maxConnections = "Carregando...";
  let openedConections = "Carregando...";
  let version = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    maxConnections = data.dependencies.database.max_connections;
    openedConections = data.dependencies.database.opened_connections;
    version = data.dependencies.database.version;
  }

  return (
    <>
      <div>Última atualização: {updatedAtText}</div>
      <h3>Banco de dados:</h3>
      <div>Maximo de conexões: {maxConnections}</div>
      <div>Conexões abertas: {openedConections}</div>
      <div>Versão: {version}</div>
    </>
  );
}
