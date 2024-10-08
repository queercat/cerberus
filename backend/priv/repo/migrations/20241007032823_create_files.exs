defmodule Backend.Repo.Migrations.CreateFiles do
  use Ecto.Migration

  def change do
    create table(:files, primary_key: false) do
      add :uuid, :uuid, primary_key: true
      add :data, :binary, null: false
      add :title, :string, null: false
      add :type, :string, null: false
      add :salt, :string, null: false

      timestamps(type: :utc_datetime)
    end
  end
end
