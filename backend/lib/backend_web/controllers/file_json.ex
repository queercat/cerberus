defmodule BackendWeb.FileJSON do

  def show(%{file: file}) do
    %{
      title: file.title,
      data: file.data
    }
  end

  def index(%{files: files}) do
    Enum.map(files, fn file ->
      %{
        title: file.title,
        uuid: file.uuid
        |> Ecto.UUID.cast()
        |> elem(1)
      }
    end)
  end
end
