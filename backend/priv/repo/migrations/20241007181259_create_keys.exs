defmodule Backend.Repo.Migrations.CreateKeys do
  use Ecto.Migration

  def change do
    create table(:keys, primary_key: false) do
      add :uuid, :uuid, primary_key: true
      add :hash, :string

      timestamps(type: :utc_datetime)
    end
  end
end
