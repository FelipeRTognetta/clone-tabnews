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
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <>
      <div>Última atualização: {updatedAtText}</div>
    </>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <div>
          Maximo de conexões: {data.dependencies.database.max_connections}
        </div>
        <div>
          Conexões abertas: {data.dependencies.database.opened_connections}
        </div>
        <div>Versão: {data.dependencies.database.version}</div>
      </>
    );
  }

  return (
    <>
      <h3>Banco de dados:</h3>
      <div>{databaseStatusInformation}</div>
    </>
  );
}
