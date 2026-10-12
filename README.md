# Paywall детской игры — Nuxt 4 + TypeScript + Supabase

## О проекте

Paywall условной детской развивающей игры. Экран сверстан по собственному макету в [Figma](https://www.figma.com/design/PxXcASlYOGtvWenAizdznM/Untitled?node-id=0-1), mobile-first, есть десктопная версия.

- **Сценарий.** Пользователь выбирает тариф (год или месяц) и нажимает «Оформить». Затем идёт загрузка, анимация успеха и экран «Ура! Всё открыто!». При ошибке показывается плашка и кнопка «Повторить оплату».
- **Восстановление покупок.** «Восстановить покупки» находит прошлую покупку этого устройства в БД.
- **Оплата.** Покупка тестовая: платёжного SDK и реальных денег нет. В БД сохраняются тариф, дата и время, условный идентификатор устройства.

## Локальный запуск

Нужен Node.js `^22.22.3` или `^24.15.0`.

1. В Supabase → SQL Editor выполните [supabase/migrations/001_test_purchases.sql](supabase/migrations/001_test_purchases.sql).
2. Установите зависимости и заполните окружение:

   ```bash
   npm install
   cp .env.example .env
   npm run dev                  # http://localhost:3000
   ```

   В `.env` нужны `SUPABASE_URL` и `SUPABASE_SECRET_KEY` (Supabase → Project Settings → API Keys).

## Структура

| Что | Где |
| --- | --- |
| Frontend | [app/pages/index.vue](app/pages/index.vue) — экран и состояния; [app/components/paywall/](app/components/paywall/) — компоненты; [app/composables/usePurchase.ts](app/composables/usePurchase.ts) — логика покупки |
| Server routes | [server/api/](server/api/): `GET /api/offers` (тарифы из [server/data/offers.ts](server/data/offers.ts)), `POST /api/purchase`, `POST /api/restore` |
| Работа с БД | [server/utils/supabase.ts](server/utils/supabase.ts) — серверный клиент; таблица `test_purchases`, миграция в [supabase/migrations/](supabase/migrations/) |
| Общие типы | [shared/types/paywall.ts](shared/types/paywall.ts) — используют и клиент, и сервер |

Идентификатор устройства выдаёт [server/middleware/device-id.ts](server/middleware/device-id.ts) в httpOnly-cookie.

## Деплой и БД

- **Vercel.** Nuxt деплоится без настройки: Nitro сам превращает server routes в serverless-функции, а статику раздаёт через CDN. Есть бесплатный тариф и превью на каждый PR. Ключи Supabase задаются в Environment Variables проекта.
- **Supabase (Postgres).** Готовый управляемый Postgres без своего сервера, есть дашборд для просмотра записей. Secret key используется только на сервере. RLS включён без политик, поэтому через публичный ключ таблицу нельзя ни прочитать, ни изменить.

## AI-инструменты

- **Claude Code** (Claude Opus) в VS Code:
  - макет в Figma через Figma MCP-коннектор: токены, компоненты, мобильные и десктопные экраны;
  - вёрстка, server routes, работа с Supabase, README.
- **Автоматическая проверка во время разработки.** Скриншоты страницы сравнивались с макетом попиксельно (Playwright + pixelmatch). Расхождение было не больше 0,74 %, совпадали координаты ключевых элементов. Проверялось и отсутствие горизонтальной прокрутки на ширине 360–1280 px. Перед сдачей тестовый код удалён.

**Что проверил сам:**
- **Сценарий в браузере:** выбор тарифа, покупка, анимация, экран успеха, восстановление покупок.
- **База:** таблица и записи в Supabase (Schema Visualizer, Table Editor).
- **Вёрстка на телефоне и десктопе.** Нашёл «прыжок» высоты карточки при загрузке страницы, добился его исправления.
- **Дизайн:** ревью и правки — убрать кнопку закрытия, отдельные плитки тарифов для десктопа, высота иллюстрации на экране успеха, переход на стиль детской игры.
- **Секреты:** проверил, что secret key не попадает в клиентский бандл и в репозиторий.

## Что дальше (ещё 2 часа)

- **Авторизация** через Supabase Auth (email или OAuth) вместо cookie устройства: покупки будут привязаны к аккаунту и восстанавливаться на любом устройстве.
- **Личный кабинет:** активная подписка, срок действия, история покупок, отмена автопродления.
- **Тесты:** unit-тесты server routes и e2e-сценарий покупки в CI.
