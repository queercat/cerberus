defmodule BackendWeb.FileController do
  alias Backend.Files.File
  alias Backend.Repo
  use BackendWeb, :controller

  import Ecto.Query

  def index(conn, _params) do
    files = Repo.all(from f in "files", select: %{title: f.title, uuid: f.uuid})
    render(conn, :index, files: files)
  end

  def show(conn, %{"file_id" => file_id}) do
    valid_id = match?({:ok, _}, Ecto.UUID.dump(file_id))

    case valid_id do
      true ->
        file = Repo.get(File, file_id)
        render(conn, :show, file: file)

      false ->
        conn |> put_status(400)
        json(conn, %{"error" => "Malformed ID"})
    end
  end

  def create(conn, %{"title" => title, "data" => data}) do
    file = File.changeset(%File{}, %{title: title, data: data})

    text = case Repo.insert(file) do
      {:ok, _} ->
        conn |> put_status(201)
        "File created"
      {:error, changeset} ->
        conn |> put_status(400)
        "Error creating file"
    end

    json(conn, %{"message" => text})
  end
end
