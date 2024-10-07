defmodule Backend.Repo.Migrations.CreateFiles do
  use Ecto.Migration

  def change do
    create table(:files, primary_key: false) do
      add :uuid, :uuid, primary_key: true
      add :data, :binary
      add :title, :string
      add :type, :string

      timestamps(type: :utc_datetime)
    end
  end
end
