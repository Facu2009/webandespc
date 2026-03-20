/**
 * dolar.js — Módulo de cotización BNA para Andes PC
 * 
 * Obtiene el dólar oficial BNA (vendedor) desde dolarapi.com
 * y convierte precios USD → ARS.
 * 
 * Uso en cualquier página de productos:
 *   import { getCotizacion, usdToArs, formatARS } from './dolar.js';
 */

// ─── Configuración ───────────────────────────────────────────────
const DOLAR_API_URL  = 'https://dolarapi.com/v1/dolares/oficial';
const CACHE_KEY      = 'andespc_cotizacion_bna';
const CACHE_MINUTES  = 60; // Refrescar cada 60 minutos
const COTIZACION_FALLBACK = 1415; // Respaldo si la API falla (actualizar periódicamente)

// ─── Obtener cotización con caché en sessionStorage ──────────────
export async function getCotizacion() {
    try {
        // 1. Intentar leer desde caché
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
            const { venta, timestamp } = JSON.parse(cached);
            const minutosTranscurridos = (Date.now() - timestamp) / 1000 / 60;
            if (minutosTranscurridos < CACHE_MINUTES) {
                console.log(`[Dólar BNA] Desde caché: $${venta} (hace ${Math.round(minutosTranscurridos)} min)`);
                return { venta, fuente: 'cache' };
            }
        }

        // 2. Consultar API
        const response = await fetch(DOLAR_API_URL, {
            signal: AbortSignal.timeout(5000) // timeout 5 segundos
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const venta = parseFloat(data.venta);

        if (isNaN(venta) || venta <= 0) throw new Error('Cotización inválida');

        // 3. Guardar en caché
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ venta, timestamp: Date.now() }));
        console.log(`[Dólar BNA] Cotización actualizada: $${venta}`);
        return { venta, fuente: 'api' };

    } catch (error) {
        console.warn(`[Dólar BNA] Error al obtener cotización: ${error.message}. Usando fallback: $${COTIZACION_FALLBACK}`);
        return { venta: COTIZACION_FALLBACK, fuente: 'fallback' };
    }
}

// ─── Convertir USD → ARS ─────────────────────────────────────────
export function usdToArs(precioUSD, cotizacion) {
    return Math.round(precioUSD * cotizacion);
}

// ─── Formatear número como precio ARS ────────────────────────────
export function formatARS(monto) {
    return '$' + monto.toLocaleString('es-AR');
}

// ─── Badge HTML con info de cotización ───────────────────────────
export function cotizacionBadgeHTML(cotizacion, fuente) {
    const color = fuente === 'fallback' ? '#f59e0b' : '#10b981';
    const icon  = fuente === 'fallback' ? '⚠️' : '💵';
    const texto = fuente === 'fallback'
        ? `Cotización estimada: $${cotizacion.toLocaleString('es-AR')} (sin conexión a API)`
        : `USD BNA: $${cotizacion.toLocaleString('es-AR')}`;
    return `<div style="text-align:center;padding:0.5rem;font-size:0.8rem;color:${color};background:rgba(0,0,0,0.03);border-radius:6px;margin-bottom:1rem;">${icon} ${texto}</div>`;
}