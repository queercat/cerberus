defmodule Backend.Files.File do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:uuid, :binary_id, autogenerate: true}

  schema "files" do
    field :data, :string
    field :title, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(file, attrs) do
    file
    |> cast(attrs, [:data, :title])
    |> validate_required([:data, :title])
  end
end
