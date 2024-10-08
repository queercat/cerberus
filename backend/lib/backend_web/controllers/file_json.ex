defmodule BackendWeb.FileJSON do

  def show(%{file: file}) do
    %{
      title: file.title,
      data: file.data,
      type: file.type,
      salt: file.salt
    }
  end

  def index(%{files: files}) do
    Enum.map(files, fn file ->
      %{
        title: file.title,
        type: file.type,
        uuid: file.uuid
        |> Ecto.UUID.cast()
        |> elem(1)
      }
    end)
  end
end
