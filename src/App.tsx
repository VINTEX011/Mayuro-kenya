import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Globe2,
  GraduationCap,
  Handshake,
  LayoutGrid,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";

type ContactConfig = {
  email: string;
  phoneDisplay: string;
  phoneWhatsApp: string;
  addressLines: string[];
};

type InquiryState = {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  otherNeed: string;
  notes: string;
};

const contact: ContactConfig = {
  email: "hello@mayuro.co.ke",
  phoneDisplay: "+254 700 000 000",
  phoneWhatsApp: "254700000000",
  addressLines: [
    "Nine Planets Apartments, Suite P4",
    "Kabarnet Gardens, Off Ngong Road",
    "Opposite the Sudan Embassy",
    "Nairobi, Kenya",
  ],
};

const trainingOptions = [
  "Customized Training Programs",
  "Cutting-edge Curriculum",
  "Flexible Delivery Formats",
  "Industry Experts",
  "Certification Programs",
  "Corporate Capability Building",
  "Other",
] as const;

const initialForm: InquiryState = {
  fullName: "",
  email: "",
  phone: "",
  organization: "",
  otherNeed: "",
  notes: "",
};

export default function App() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trainingNeed, setTrainingNeed] = useState<string>(trainingOptions[0]);
  const [formData, setFormData] = useState<InquiryState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryState | "trainingNeed", string>>>(
    {}
  );

  const values = useMemo(
    () => [
      {
        icon: Award,
        title: "Excellence",
        desc: "We deliver training experiences that meet high professional standards and real business needs.",
      },
      {
        icon: Sparkles,
        title: "Innovation",
        desc: "Modern, relevant learning experiences built around changing industries and new ways of working.",
      },
      {
        icon: ShieldCheck,
        title: "Integrity",
        desc: "Transparent, ethical, and dependable in every engagement, from briefing to final delivery.",
      },
      {
        icon: Target,
        title: "Client-Centric",
        desc: "Programs shaped around client goals, team capability gaps, and measurable results.",
      },
      {
        icon: Handshake,
        title: "Collaboration",
        desc: "We work closely with organizations and leaders to create practical, lasting impact.",
      },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        icon: LayoutGrid,
        title: "Customized Training Programs",
        desc: "Tailored sessions designed around specific teams, sectors, and learning outcomes.",
      },
      {
        icon: Sparkles,
        title: "Cutting-edge Curriculum",
        desc: "Updated content that reflects modern business realities, tools, and best practices.",
      },
      {
        icon: Globe2,
        title: "Flexible Delivery Formats",
        desc: "In-person, virtual, and hybrid delivery to suit different organizations and schedules.",
      },
      {
        icon: Briefcase,
        title: "Industry Experts",
        desc: "Experienced facilitators who bring practical insights, not just theory.",
      },
      {
        icon: GraduationCap,
        title: "Certification Programs",
        desc: "Recognition-based learning pathways that validate skills and competence.",
      },
      {
        icon: Building2,
        title: "Corporate Capability Building",
        desc: "Programs that strengthen leadership, performance, communication, and team growth.",
      },
    ],
    []
  );

  const trustCards = useMemo(
    () => [
      {
        icon: Target,
        title: "Tailored Training",
        desc: "Programs aligned to client goals, sector needs, and real skill gaps.",
      },
      {
        icon: Globe2,
        title: "Flexible Delivery",
        desc: "Virtual, in-person, and hybrid learning models built around modern schedules.",
      },
      {
        icon: Users,
        title: "Expert Facilitators",
        desc: "Practical insight from experienced professionals with real-world perspective.",
      },
      {
        icon: CheckCircle2,
        title: "Results Focused",
        desc: "Training designed to improve performance, capability, and organizational growth.",
      },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        quote:
          "Mayuro Kenya helped us sharpen our learning strategy and package our staff development priorities into a practical, structured program.",
        name: "Operations Lead",
        role: "Corporate Client",
      },
      {
        quote:
          "Their delivery style felt polished, collaborative, and clearly tailored to our team's actual day-to-day challenges.",
        name: "HR Manager",
        role: "SME Client",
      },
      {
        quote:
          "The balance between professionalism and accessibility made the sessions useful for both management and frontline teams.",
        name: "Learning Coordinator",
        role: "Training Partner",
      },
    ],
    []
  );

  const clientele = useMemo(
    () => ["Individuals", "SMEs", "Corporates", "Top Management"],
    []
  );

  const openWhatsApp = () => {
    window.open(`https://wa.me/${contact.phoneWhatsApp}`, "_blank", "noopener,noreferrer");
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === "trainingNeed") {
      setTrainingNeed(value);
      setErrors((prev) => ({ ...prev, trainingNeed: undefined }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setTrainingNeed(trainingOptions[0]);
    setErrors({});
  };

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof InquiryState | "trainingNeed", string>> = {};

    if (!formData.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!formData.email.trim()) nextErrors.email = "Please enter your email address.";
    if (!formData.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (trainingNeed === "Other" && !formData.otherNeed.trim()) {
      nextErrors.otherNeed = "Please describe your training need.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleDemoSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    const subject = encodeURIComponent("Mayuro Kenya Consultation Request");
    const body = encodeURIComponent(
      [
        `Full Name: ${formData.fullName}`,
        `Email: ${formData.email}`,
        `Phone: ${formData.phone}`,
        `Organization: ${formData.organization || "Not provided"}`,
        `Training Need: ${trainingNeed}${trainingNeed === "Other" ? ` - ${formData.otherNeed}` : ""}`,
        `Additional Notes: ${formData.notes || "None"}`,
      ].join("\n")
    );

    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setOpen(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="section-shell flex items-center justify-between py-4">
          <button onClick={() => scrollToSection("hero")} className="flex items-center gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#153C8A] text-lg font-extrabold text-white shadow-sm">
              M
            </div>
            <div>
              <div className="font-display text-lg font-extrabold tracking-tight text-[#153C8A]">
                MAYURO KENYA
              </div>
              <div className="text-xs tracking-[0.18em] text-slate-500">
                Professional Training Solutions
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
            {[
              ["About", "about"],
              ["Programs", "programs"],
              ["Values", "values"],
              ["Impact", "impact"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="transition hover:text-[#153C8A]"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </button>
            <button
              onClick={() => setOpen(true)}
              className="rounded-2xl bg-[#F28C28] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:scale-[1.02]"
            >
              Book Consultation
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-xl border border-slate-200 p-2 text-slate-700 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {[
                ["About", "about"],
                ["Programs", "programs"],
                ["Values", "values"],
                ["Impact", "impact"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="rounded-xl px-3 py-2 text-left font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  {label}
                </button>
              ))}
              <div className="mt-2 flex gap-3">
                <button
                  onClick={openWhatsApp}
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => {
                    setOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 rounded-xl bg-[#F28C28] px-4 py-2.5 font-semibold text-white"
                >
                  Consult
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section
          id="hero"
          className="relative overflow-hidden bg-[linear-gradient(135deg,#0B1733_0%,#153C8A_55%,#0F172A_100%)] text-white"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-orange-400 blur-3xl" />
            <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-blue-400 blur-3xl" />
          </div>

          <div className="section-shell relative grid items-center gap-12 py-20 lg:grid-cols-[1.02fr_0.98fr] lg:py-28">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-md">
                Corporate training with a premium digital presence
              </div>
              <h1 className="font-display max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Empowering Individuals and Organizations to Thrive
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
                Mayuro Kenya delivers high-quality professional training programs tailored to the evolving
                needs of individuals, teams, SMEs, corporations, and top management.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("programs")}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#F28C28] px-6 py-3.5 font-bold text-white shadow-xl shadow-orange-500/20 transition hover:scale-[1.02]"
                >
                  Explore Programs
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Book Consultation
                </button>
              </div>

              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                {[
                  ["Tailored", "Training solutions"],
                  ["Flexible", "Virtual, hybrid, physical"],
                  ["Professional", "Client-ready delivery"],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"
                  >
                    <div className="text-2xl font-extrabold">{title}</div>
                    <div className="mt-1 text-sm text-white/70">{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[2rem] bg-white/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-lg">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-xl md:col-span-2">
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80"
                      alt="Professional team in a corporate training environment"
                      className="h-64 w-full object-cover"
                    />
                    <div className="p-6 text-slate-900">
                      <div className="text-sm font-bold uppercase tracking-[0.2em] text-[#F28C28]">
                        Trusted first impression
                      </div>
                      <h2 className="mt-2 font-display text-2xl font-extrabold text-[#153C8A]">
                        A clean corporate website that immediately builds trust
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        Strong visuals, clearer messaging, and a polished structure help potential clients
                        understand value quickly.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] bg-[#F28C28] p-6 text-white shadow-xl">
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                      Delivery
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-extrabold">
                      Virtual, In-Person & Hybrid
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/85">
                      Training formats designed around modern learning needs and organizational schedules.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-950/80 p-6 text-white shadow-xl">
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                      Mission-led
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-extrabold">Practical and growth-focused</h3>
                    <p className="mt-3 text-sm leading-7 text-white/80">
                      Every section is designed to communicate competence, professionalism, and confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-10">
          <div className="grid gap-5 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:grid-cols-2 lg:grid-cols-4 lg:p-8">
            {trustCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.5rem] bg-slate-50 p-6 ring-1 ring-slate-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#153C8A] text-white shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 font-display text-xl font-extrabold tracking-tight text-[#153C8A]">
                    {item.title}
                  </div>
                  <div className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="about"
          className="section-shell grid items-center gap-12 py-20 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-200">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Business professionals collaborating during a meeting"
              className="h-[420px] w-full object-cover"
            />
          </div>

          <div>
            <div className="mb-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#F28C28]">
              About Mayuro
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#153C8A] sm:text-4xl lg:text-5xl">
              A dynamic training company built for today&apos;s competitive business landscape
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Mayuro Kenya is dedicated to empowering individuals and organizations with the knowledge and
              skills needed to grow, perform, and succeed.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              We offer high-quality professional training programs tailored to evolving client needs across
              different sectors.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-[#153C8A] p-6 text-white shadow-lg">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  Core focus
                </div>
                <div className="mt-3 font-display text-2xl font-extrabold">Professional Development</div>
                <p className="mt-3 text-white/80">
                  Helping people and organizations build capabilities that matter in real work environments.
                </p>
              </div>
              <div className="rounded-[1.5rem] bg-[#FFF4EA] p-6 ring-1 ring-orange-100">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F28C28]">
                  Client promise
                </div>
                <div className="mt-3 font-display text-2xl font-extrabold text-slate-900">
                  Clear, practical value
                </div>
                <p className="mt-3 text-slate-600">
                  Content is structured to support faster decision-making, stronger trust, and better client
                  engagement.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="programs" className="bg-slate-50 py-20">
          <div className="section-shell">
            <div className="max-w-3xl">
              <div className="mb-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#F28C28]">
                Key Offerings
              </div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#153C8A] sm:text-4xl lg:text-5xl">
                Strong service presentation that makes visitors want to inquire
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Each service is presented in a premium format that feels modern, corporate, and easy to trust.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="group rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#153C8A] text-lg font-extrabold text-white shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-extrabold text-slate-900">{service.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{service.desc}</p>
                    <button
                      onClick={() => {
                        setTrainingNeed(service.title);
                        setErrors((prev) => ({ ...prev, trainingNeed: undefined }));
                        setOpen(true);
                      }}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#F28C28] transition hover:underline"
                    >
                      Inquire now
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="values" className="section-shell py-20">
          <div className="mb-12 max-w-3xl">
            <div className="mb-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#F28C28]">
              Mission & Values
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#153C8A] sm:text-4xl lg:text-5xl">
              The trust layer every serious corporate website needs
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              This section helps visitors understand not just what Mayuro does, but how the company works.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[2rem] bg-[linear-gradient(135deg,#0F172A_0%,#153C8A_100%)] p-8 text-white shadow-xl">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Mission</div>
              <h3 className="mt-4 font-display text-3xl font-extrabold">
                To inspire excellence through innovative training solutions
              </h3>
              <p className="mt-5 text-lg leading-8 text-white/80">
                A clear, memorable mission statement communicates purpose faster than a dense block of text.
              </p>
              <div className="mt-8 overflow-hidden rounded-[1.5rem] ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                  alt="Corporate workshop and business learning environment"
                  className="h-64 w-full object-cover"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-[#153C8A]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-4 font-display text-xl font-extrabold text-slate-900">{value.title}</div>
                    <p className="mt-3 leading-7 text-slate-600">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="section-shell">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=80"
                  alt="Business handshake representing clientele and partnerships"
                  className="h-72 w-full object-cover"
                />
              </div>
              <div className="rounded-[2rem] bg-[#153C8A] p-8 text-white shadow-xl lg:col-span-2">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Clientele</div>
                <h2 className="mt-4 font-display text-3xl font-extrabold">
                  Trusted by individuals, SMEs, corporates, parastatals, and top management
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
                  The client journey clearly shows who the company serves, helping visitors quickly identify
                  if they belong here.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {clientele.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-center font-bold backdrop-blur"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="impact"
          className="bg-[linear-gradient(135deg,#0B1733_0%,#153C8A_100%)] py-20 text-white"
        >
          <div className="section-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-3 text-sm font-extrabold uppercase tracking-[0.25em] text-orange-300">
                Social Responsibility
              </div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                A professional brand with visible community impact
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
                Mayuro Kenya communicates more than business value. The brand also reflects commitment to
                educational projects and support initiatives for underserved communities.
              </p>
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
                <div className="font-display text-xl font-extrabold">Why this improves trust</div>
                <p className="mt-3 text-white/75">
                  It adds warmth and depth to the brand, helping corporate visitors see Mayuro as both
                  capable and responsible.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=80"
                alt="Community impact and educational support visual"
                className="h-full min-h-[420px] w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="section-shell py-20">
          <div className="mb-10 max-w-3xl">
            <div className="mb-3 text-sm font-extrabold uppercase tracking-[0.25em] text-[#F28C28]">
              Website Experience
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#153C8A] sm:text-4xl lg:text-5xl">
              Added a testimonial-style trust section for a stronger conversion feel
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
                <div className="text-4xl font-black text-[#F28C28]">"</div>
                <p className="mt-4 text-lg leading-8 text-slate-700">{item.quote}</p>
                <div className="mt-8 border-t border-slate-200 pt-5">
                  <div className="font-extrabold text-slate-900">{item.name}</div>
                  <div className="text-sm text-slate-500">{item.role}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-shell pb-20">
          <div className="overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#FFF4EA_0%,#FFFFFF_60%,#F5F9FF_100%)] px-8 py-14 shadow-sm ring-1 ring-slate-200 lg:px-16">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <div className="text-sm font-extrabold uppercase tracking-[0.25em] text-[#F28C28]">
                  Ready to engage?
                </div>
                <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#153C8A] sm:text-4xl">
                  Let&apos;s discuss the right training solution for your team or organization
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                  The site brings together a premium interface, a stronger user journey, and direct contact
                  actions into one polished experience.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => setOpen(true)}
                    className="rounded-2xl bg-[#153C8A] px-6 py-3.5 font-bold text-white shadow-lg transition hover:scale-[1.02]"
                  >
                    Book Consultation
                  </button>
                  <button
                    onClick={openWhatsApp}
                    className="rounded-2xl border border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-800 transition hover:bg-slate-50"
                  >
                    Chat on WhatsApp
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80"
                  alt="Corporate leaders in a strategic meeting"
                  className="h-[360px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="border-t border-slate-200 bg-white">
        <div className="section-shell grid gap-10 py-14 lg:grid-cols-3">
          <div>
            <div className="font-display text-xl font-extrabold tracking-tight text-[#153C8A]">MAYURO KENYA</div>
            <p className="mt-4 max-w-sm leading-7 text-slate-600">
              A professional training brand positioned to attract serious clients through a premium and
              trustworthy web experience.
            </p>
          </div>

          <div>
            <div className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#F28C28]">Contact</div>
            <p className="mt-4 leading-7 text-slate-600">
              Email: {contact.email}
              <br />
              Phone: {contact.phoneDisplay}
            </p>
          </div>

          <div>
            <div className="text-sm font-extrabold uppercase tracking-[0.2em] text-[#F28C28]">Address</div>
            <p className="mt-4 leading-7 text-slate-600">
              {contact.addressLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < contact.addressLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </div>
        </div>
      </footer>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200">
            <div className="bg-[linear-gradient(135deg,#153C8A_0%,#0F172A_100%)] px-8 py-6 text-white">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
                Consultation Request
              </div>
              <h3 className="mt-2 font-display text-2xl font-extrabold">Book Consultation</h3>
              <p className="mt-2 text-white/75">
                Share your training need and Mayuro Kenya will know where to start.
              </p>
            </div>

            <div className="p-8">
              <form className="space-y-4" onSubmit={handleDemoSubmit}>
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={updateField}
                    placeholder="Full Name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#153C8A]"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={updateField}
                    placeholder="Email Address"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#153C8A]"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={updateField}
                    placeholder="Phone Number"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#153C8A]"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={updateField}
                  placeholder="Company / Organization"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#153C8A]"
                />

                <div>
                  <select
                    name="trainingNeed"
                    value={trainingNeed}
                    onChange={updateField}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#153C8A]"
                  >
                    {trainingOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  {errors.trainingNeed && <p className="mt-1 text-sm text-red-600">{errors.trainingNeed}</p>}
                </div>

                {trainingNeed === "Other" && (
                  <div>
                    <textarea
                      name="otherNeed"
                      value={formData.otherNeed}
                      onChange={updateField}
                      placeholder="Specify your training need"
                      className="min-h-[120px] w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#153C8A]"
                    />
                    {errors.otherNeed && <p className="mt-1 text-sm text-red-600">{errors.otherNeed}</p>}
                  </div>
                )}

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={updateField}
                  placeholder="Additional notes"
                  className="min-h-[120px] w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#153C8A]"
                />

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#153C8A] px-5 py-3 font-bold text-white transition hover:bg-[#102d68]"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </button>
                </div>
              </form>

              <button
                onClick={() => setOpen(false)}
                className="mt-5 text-sm font-semibold text-slate-500 transition hover:text-red-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={openWhatsApp}
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 font-bold text-white shadow-lg transition hover:scale-[1.03]"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </button>
    </div>
  );
}
