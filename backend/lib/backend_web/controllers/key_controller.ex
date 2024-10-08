defmodule BackendWeb.KeyController do
  import Argon2

  use BackendWeb, :controller

  def index(conn, _params) do
    key = Backend.Keys.get_key()

    render(conn, :index, key: key.hash)
  end

  def create(conn, %{"hashed_key" => hashed_key}) do
    key = Backend.Keys.get_key()

    case key.hash do
      nil -> case Backend.Keys.create_key(%{hash: hashed_key})  do
        {:ok, _} -> conn |> put_status(201) |> text("Key created")
        {:error, changeset} ->
          changeset |> IO.inspect()
          conn |> put_status(400) |> text("Key not created")
      end
      _ -> conn |> put_status(400) |> text("Key already exists")
    end
  end

  def validate(conn, %{"hashed_key" => key}) do
    result = Backend.Keys.validate_key(key)

    case result do
      {:ok, _} -> conn |> json(%{message: "valid"})
      {:error, _} -> conn |> json(%{message: "invalid"})
    end
  end
end
