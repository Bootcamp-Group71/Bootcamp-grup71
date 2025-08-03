# Supabase bağımlılığı yoruma alındı - Local çalışma için
# from supabase import create_client, Client
from app.core.config import settings


def get_supabase_client():
    """Get Supabase client instance - YORUMA ALINDI."""
    # return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    raise NotImplementedError("Supabase bağlantısı local çalışma için devre dışı bırakıldı")


def get_supabase_service_client():
    """Get Supabase service client instance with admin privileges - YORUMA ALINDI."""
    # return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)
    raise NotImplementedError("Supabase service bağlantısı local çalışma için devre dışı bırakıldı") 