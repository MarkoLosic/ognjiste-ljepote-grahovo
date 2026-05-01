import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

// Sela opštine Bosansko Grahovo koja nisu prikazana na stranici "Grad i sela"
const otherVillages = [
  { name: "Crni Lug", description: "Naselje smješteno u plodnoj dolini, poznato po Crnoluškom polju i tradicionalnom stočarstvu." },
  { name: "Donje Peulje", description: "Selo u jugoistočnom dijelu opštine, okruženo pašnjacima i šumama planine Staretine." },
  { name: "Gornje Peulje", description: "Naselje na padinama Staretine, sa pogledom na prostrana grahovska polja." },
  { name: "Drvar Selo", description: "Selo u sjevernom dijelu opštine, blizu granice sa opštinom Drvar." },
  { name: "Grkovci", description: "Tradicionalno selo u kraškoj dolini, poznato po izvorima pitke vode." },
  { name: "Isjek", description: "Mirno seosko naselje okruženo šumama, idealno za odmor u prirodi." },
  { name: "Jaruga", description: "Selo smješteno uz potok, sa očuvanom prirodom i tradicionalnom arhitekturom." },
  { name: "Kazanci", description: "Naselje na zapadnom dijelu opštine, blizu Dinare." },
  { name: "Luka", description: "Malo selo na obroncima planina, poznato po pitkim izvorima." },
  { name: "Maleševci", description: "Selo u brdovitom predjelu, sa autentičnim seoskim ambijentom." },
  { name: "Marinkovci", description: "Naselje u dolini, okruženo livadama i šumama." },
  { name: "Mračaj", description: "Selo na nadmorskoj visini od oko 400 m, najniža tačka opštine." },
  { name: "Nuglašica", description: "Tradicionalno selo grahovskog kraja, sa bogatom prirodom." },
  { name: "Pribelja", description: "Naselje u sjeveroistočnom dijelu opštine, prema Glamoču." },
  { name: "Radanovci", description: "Selo u kraškom predjelu, poznato po pašnjacima i stočarstvu." },
  { name: "Radlovići", description: "Mirno seosko naselje sa očuvanim tradicionalnim načinom života." },
  { name: "Tičevo", description: "Visoravan na nadmorskoj visini od 1098 m, prolaz prema Glamoču." },
  { name: "Ugarci", description: "Naselje u dolini, okruženo planinama i šumama." },
  { name: "Vidovići", description: "Selo na padinama planine, sa pogledom na okolna polja." },
  { name: "Zaseok", description: "Malo naselje sa autentičnim ambijentom planinskog sela." },
  { name: "Zebe", description: "Naselje u središnjem dijelu opštine, blizu Bosanskog Grahova." },
  { name: "Donji Tiškovac", description: "Selo poznato po željezničkoj stanici na pruzi Bosanski Novi – Knin." },
  { name: "Bosanski Drenovac", description: "Naselje sa željezničkom stanicom, smješteno uz prugu." },
  { name: "Crni Vrh", description: "Visoravansko selo sa pogledom na grahovska polja." },
];

export default function OstalaSela() {
  return (
    <Layout>
      {/* Header */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Link
              to="/grad-i-sela"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-6 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Nazad na Grad i sela
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ostala sela opštine
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Opština Bosansko Grahovo broji 32 naseljena mjesta. Pored sela
              prikazanih na stranici "Grad i sela", evo ostalih naselja koja
              čine bogatu zajednicu grahovskog kraja.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Villages Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {otherVillages.map((village, index) => (
              <motion.div
                key={village.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-accent/40 transition-all"
              >
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {village.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {village.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-muted-foreground text-sm mt-12 max-w-2xl mx-auto italic"
          >
            Napomena: Lista obuhvata naselja u sastavu opštine Bosansko Grahovo.
            Imena i opisi mogu biti dopunjeni dodatnim podacima.
          </motion.p>
        </div>
      </section>
    </Layout>
  );
}
