# فرآیند تولید محتوا / خط لوله محتوا

همه اسکریپت ها داخل هستند`scripts/atlas/`، اعتبارنامه ها فقط از متغیرهای محیطی یا دایرکتوری های خارج از مخزن خوانده می شوند (به [SECURITY.md](../SECURITY.md) مراجعه کنید). نوشتن متوسط ​​توسط Git نادیده گرفته می شود`.local/forge/`، می توانید از نقطه شکست به دویدن ادامه دهید.

1. **پیشوند**:`.local/forge/headwords.json`، هر مورد`{hid, word, raw}`。`raw`این یک اشاره به معنای اختیاری است. فقط برای تعیین اینکه کدام معانی مهم هستند استفاده می شود و در خروجی کپی نمی شود.
2. **متن اصطلاح**`gen_text.py`: 10 کلمه در هر دسته، [`gen_text.py`](../scripts/atlas/gen_text.py) (اول دقت، اصالت، دو نوع جمله مثال، بدون ریشه شناسی ساختگی، خنثی امنیتی) برای تولید JSON.
3. **تصاویر**`gen_images.py`: هر ورودی همراه با شرح صحنه است`scene`، ترکیب شده با کلمات سریع سبک یکپارچه برای ایجاد یک تصویر 1024 پیکسلی، فشرده شده به یک WebP Master 768px. به ترتیب مسیرهای یادگیری ایجاد شده است.
4. **تلفظ**`gen_word_audio.py`：ElevenLabs، تلفظ انگلیسی Alice، تلفظ آمریکایی Sarah.
5. **جملات مثال با صدای بلند خوانده می شود**`gen_sentence_audio.py`: برای`ex[0]`خواندن مصنوعی با صدای بلند، به ترتیب مسیر یادگیری.
6. **کامپایل**`build_atlas.py`: زمینه ها را تمیز کنید، مرتب کنید، برش دهید و تولید کنید`public/atlas/`و`data/`。
7. ** تأیید **`npm run check:atlas`: ساختار، ترتیب، مراجع و وجود فایل رسانه ای.

```bash
export SUB2_BASE_URL=... SUB2_API_KEY=... ELEVENLABS_API_KEY=...
python3 scripts/atlas/gen_text.py --workers 8
python3 scripts/atlas/gen_images.py --workers 8 --follow
python3 scripts/atlas/gen_word_audio.py
python3 scripts/atlas/gen_sentence_audio.py --follow
python3 scripts/atlas/build_atlas.py
npm run check:atlas
```

`SUB2_BASE_URL`به هر رابط سازگار با OpenAI اشاره می کند.

## مرز کیفیت

تأیید خودکار ساختارها، فیلدها، توالی ها و فایل ها را پوشش می دهد، اما صحت معنایی را پوشش نمی دهد. تصاویر و جملات مثال به صورت دستی یک به یک بررسی نشده اند. اگر مشکلی پیدا کردید، لطفاً یک شماره یا روابط عمومی ارسال کنید.
