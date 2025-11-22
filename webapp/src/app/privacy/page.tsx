export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-3xl border border-emerald-100 bg-white p-10 text-sm leading-8 text-emerald-800 shadow-lg">
      <h1 className="text-3xl font-bold text-emerald-900">سياسة الخصوصية</h1>
      <p>
        نحافظ في منصة الفتاوى الذكية على خصوصية المستخدمين ونعمل على حماية
        بياناتهم وفق أفضل المعايير. توضح هذه السياسة كيفية جمع البيانات
        واستخدامها وتخزينها.
      </p>
      <section>
        <h2 className="mb-2 text-xl font-semibold text-emerald-900">
          البيانات التي نجمعها
        </h2>
        <ul className="list-disc space-y-2 pr-6 text-right">
          <li>اسم المستخدم وعنوان البريد الإلكتروني (إن وجد).</li>
          <li>نص السؤال أو الاستفسار المرسل إلى لجنة الفتوى.</li>
          <li>الملفات المرفقة التي يرفعها المستخدم بصورة اختيارية.</li>
        </ul>
      </section>
      <section>
        <h2 className="mb-2 text-xl font-semibold text-emerald-900">
          كيفية استخدام البيانات
        </h2>
        <p>
          تستخدم البيانات حصراً للرد على الأسئلة الشرعية وتحسين جودة المحتوى.
          لا يتم مشاركة البيانات مع أي طرف ثالث دون موافقة صريحة من المستخدم.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-xl font-semibold text-emerald-900">
          حماية البيانات
        </h2>
        <p>
          يتم تخزين البيانات في Firebase مع تطبيق سياسات الأمان الموصى بها،
          وضبط الصلاحيات عبر قواعد الأمان وإدارة الوصول.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-xl font-semibold text-emerald-900">
          تواصل معنا
        </h2>
        <p>
          لأي استفسارات تتعلق بالخصوصية، يمكنكم مراسلتنا عبر البريد الإلكتروني:
          privacy@fatawa.app
        </p>
      </section>
    </article>
  );
}
