defmodule BackendWeb.FileController do
  alias Backend.Files.File
  alias Backend.Repo
  use BackendWeb, :controller

  import Ecto.Query

  def index(conn, _params) do
    files = Repo.all(from f in "files", select: %{title: f.title, uuid: f.uuid, type: f.type})
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

  def create(conn, %{"title" => title, "data" => data, "type" => type}) do
    file = File.changeset(%File{}, %{title: title, data: data, type: type})

    text = case Repo.insert(file) do
      {:ok, _} ->
        conn = conn |> put_status(201)
        "File created"
      {:error, changeset} ->
        conn = conn |> put_status(400)
        changeset |> IO.inspect()
        "Error creating file"
    end

    json(conn, %{"message" => text})
  end
end
