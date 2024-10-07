defmodule BackendWeb.Router do
  use BackendWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])

  end

  scope "/api/file", BackendWeb do
    pipe_through(:api)

    get("/:file_id", FileController, :show)
  end

  scope "/api/files", BackendWeb do
    pipe_through(:api)

    get("/", FileController, :index)
    post("/", FileController, :create)
  end

  scope "/api/key", BackendWeb do
    pipe_through(:api)

    get("/", KeyController, :index)
    post("/", KeyController, :create)
    post("/validate", KeyController, :validate)
  end
end
