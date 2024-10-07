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

    post("/", FileController, :create)
    get("/", FileController, :index)
  end
end
