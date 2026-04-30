import Layout from "@/components/Layout";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F7FC]">
      <div className="h-2 bg-[#1E2761]" />
      <Layout>
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="font-serif text-3xl font-bold text-[#1A1A2E]">About Blueprint</h1>
          <p className="mt-3 text-base text-[#2D3748]">
            Blueprint Student Success is built for students doing the hard work of planning a future without a lot of
            extra support. This tool helps you start with your values, see real job options, and move one step at a
            time.
          </p>
        </section>
      </Layout>
    </div>
  );
}
