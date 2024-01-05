# MEARN STARK E-Cormmece Web App


## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **User Management:** [Clerk](https://clerk.com)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Email:** [React Email](https://react.email)
- **Content Management:** [Contentlayer](https://www.contentlayer.dev)
- **File Uploads:** [uploadthing](https://uploadthing.com)
- **Payments infrastructure:** [Stripe](https://stripe.com)

## Features to be implemented

- [x] Authentication with **Clerk**
- [x] File uploads with **uploadthing**
- [x] Newsletter subscription with **React Email** and **Resend**
- [x] Blog using **MDX** and **Contentlayer**
- [x] ORM using **Drizzle ORM**
- [x] Database on **PlanetScale**
- [x] Validation with **Zod**
- [x] Storefront with products, categories, and subcategories
- [x] Seller and customer workflows
- [x] User subscriptions with **Stripe**
- [ ] Checkout with **Stripe Checkout**
- [ ] Admin dashboard with stores, products, orders, subscriptions, and payments

## Running Locally

1. Clone the repository

   ```bash
   git clone https://github.com/mrjuice01/MEARN-STAW-Shoping-App.git
   ```

2. Install dependencies using pnpm

   ```bash
   pnpm install
   ```

3. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

4. Start the development server

   ```bash
   pnpm run dev
   ```

5. Push the database schema

   ```bash
   pnpm run db:push
   ```

6. Start the Stripe webhook listener

   ```bash
   pnpm run stripe:listen
   ```

***
## Support <img src="https://user-images.githubusercontent.com/64035221/113476039-61b21c80-9496-11eb-93d1-97a97f6acaa6.png" width="30" height="30">

<table align="center" style="border:1px solid black;margin-left:auto;margin-right:auto;">
  <tr>
    <th><img src="https://user-images.githubusercontent.com/100421286/272568945-0cb5c1cb-b544-4287-962b-cf5ebab61d3d.jpg" width="100%" height="100%"></th>
  </tr>
  <tr>
    <td><a href="https://github.com/mrjuice01/"><p align='center'><b>Mr Juice</b></td>
  </tr>
  <tr>
    <td><p align='center'><b>Author</b></td>
  </tr>
</table>

<p align="center"><a href="https://github.com/mrjuice01"><img src="https://user-images.githubusercontent.com/64035221/96459220-834c7e00-123f-11eb-8417-534058a7ba62.png" alt="GitHub" width="80" height="80">
<a href="https://www.youtube.com/@mrjuiceofc"><img src="https://user-images.githubusercontent.com/64035221/96456596-4f238e00-123c-11eb-821e-85e9aaa3faec.png" alt="YouTube" width="80" height="80">
<a href="https://t.me/DeveloperJuice"><img src="https://user-images.githubusercontent.com/64035221/113977119-b91e0700-985f-11eb-9418-eab91ff1540e.png" alt="Telegram" width="80" height="">
<a href="https://www.instagram.com/mr_juice7/"><img src="https://user-images.githubusercontent.com/64035221/113977904-e61ee980-9860-11eb-82d1-9ebd795c8138.png" alt="Instagram" width="80" height="">


This is a free open souce roject for a full stack ecommece web app.
Pliz Care to star
