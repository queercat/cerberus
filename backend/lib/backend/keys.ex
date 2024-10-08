defmodule Backend.Keys do
  @moduledoc """
  The Keys context.
  """

  import Ecto.Query, warn: false
  alias Backend.Repo

  alias Backend.Keys.Key

  @doc """
  Returns the list of keys.

  ## Examples

      iex> list_keys()
      [%Key{}, ...]

  """
  def list_keys do
    Repo.all(Key)
  end

  def get_key do
    case list_keys() do
      [] -> %Key{}
      keys -> keys |> hd
    end
  end

  @doc """
  Gets a single key.

  Raises `Ecto.NoResultsError` if the Key does not exist.

  ## Examples

      iex> get_key!(123)
      %Key{}

      iex> get_key!(456)
      ** (Ecto.NoResultsError)

  """
  def get_key!(id), do: Repo.get!(Key, id)

  def validate_key(key) do
    case get_key() do
      nil -> {:error, "Key does not exist"}
      master_key -> case Argon2.verify_pass(key, master_key.hash) do
        true -> {:ok, "Key is valid"}
        false -> {:error, "Key is invalid"}
      end
    end
  end

  @doc """
  Creates a key.

  ## Examples

      iex> create_key(%{field: value})
      {:ok, %Key{}}

      iex> create_key(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_key(attrs \\ %{}) do
    %Key{}
    |> Key.changeset(attrs)
    |> IO.inspect()
    |> hash_key()
    |> Repo.insert()
  end

  def hash_key(changeset) do
    changeset.changes |> IO.inspect()
    if changeset.valid? do
      Ecto.Changeset.put_change(changeset, :hash, Argon2.hash_pwd_salt(changeset.changes.hash))
    else
      changeset
    end
  end

  @doc """
  Updates a key.

  ## Examples

      iex> update_key(key, %{field: new_value})
      {:ok, %Key{}}

      iex> update_key(key, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_key(%Key{} = key, attrs) do
    key
    |> Key.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a key.

  ## Examples

      iex> delete_key(key)
      {:ok, %Key{}}

      iex> delete_key(key)
      {:error, %Ecto.Changeset{}}

  """
  def delete_key(%Key{} = key) do
    Repo.delete(key)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking key changes.

  ## Examples

      iex> change_key(key)
      %Ecto.Changeset{data: %Key{}}

  """
  def change_key(%Key{} = key, attrs \\ %{}) do
    Key.changeset(key, attrs)
  end
end
