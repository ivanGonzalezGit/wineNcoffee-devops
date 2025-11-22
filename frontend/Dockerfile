# ---------- Etapa 1: Build ----------
FROM node:18 AS build

# Seteo de workspace
WORKDIR /app

# Copiamos package.json e instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos la app (genera /dist)
RUN npm run build


# ---------- Etapa 2: Producción ----------
FROM nginx:alpine

# Copiamos el build de Vite a nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto por donde sirve nginx
EXPOSE 80

# Nginx ya tiene su propio comando de inicio
