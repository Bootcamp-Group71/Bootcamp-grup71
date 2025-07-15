from fastapi import FastAPI

app = FastAPI(title="Hayat Kurtaran Adımlar API", version="1.0.0")

@app.get("/")
def read_root():
    return {"message": "Backend çalışıyor 🚀"}
