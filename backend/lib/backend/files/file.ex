defmodule Backend.Files.File do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:uuid, :binary_id, autogenerate: true}

  schema "files" do
    field :data, :binary
    field :title, :string
    field :type, :string
    field :salt, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(file, attrs) do
    file
    |> cast(attrs, [:data, :title, :type, :salt])
    |> validate_required([:data, :title, :type, :salt])
  end
end
