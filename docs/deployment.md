# استقرار / استقرار

`npm run build`سایت استاتیک خالص ایجاد کنید`dist/`را می توان در هر میزبانی ثابت (Nginx، Cloudflare Pages، Vercel، GitHub Pages) قرار داد.

## مسیر فرعی

```bash
ATLAS_BASE=/words/ npm run build
```

## مثال Nginx

```nginx
location ^~ /words/ {
    alias /var/www/word-atlas/;
    try_files $uri $uri/ /words/index.html;
    expires 7d;
}
```

## GitHub Pages

انبار دارد`.github/workflows/pages.yml`. "عملکردهای GitHub" را در تنظیمات مخزن → Pages انتخاب کنید و سپس به صورت دستی "Deploy to GitHub Pages" را اجرا کنید.

## حجم

تصاویر و صدا در مجموع حدود چند صد مگابایت است. توصیه می شود در پشت یک CDN مستقر شوید یا فقط در صورت تقاضا منتشر کنید`thumb/`و مقداری صدا
