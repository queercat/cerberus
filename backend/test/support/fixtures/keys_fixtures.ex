defmodule Backend.KeysFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Keys` context.
  """

  @doc """
  Generate a key.
  """
  def key_fixture(attrs \\ %{}) do
    {:ok, key} =
      attrs
      |> Enum.into(%{
        hash: "some hash"
      })
      |> Backend.Keys.create_key()

    key
  end
end
