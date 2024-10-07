defmodule Backend.Keys.Key do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:uuid, :binary_id, autogenerate: true}

  schema "keys" do
    field :hash, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(key, attrs) do
    key
    |> cast(attrs, [:hash])
    |> validate_required([:hash])
  end
end
