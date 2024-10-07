defmodule Backend.FilesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Backend.Files` context.
  """

  @doc """
  Generate a file.
  """
  def file_fixture(attrs \\ %{}) do
    {:ok, file} =
      attrs
      |> Enum.into(%{
        data: "some data",
        title: "some title"
      })
      |> Backend.Files.create_file()

    file
  end
end
