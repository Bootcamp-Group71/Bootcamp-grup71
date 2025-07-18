from fastapi import FastAPI
from app.routers import auth

app = FastAPI(title="Hayat Kurtaran Adımlar API", version="1.0.0")

# Routerlar
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])

@app.get("/")
def root():
    return {"message": "Backend Çalışıyor 🚀"}
