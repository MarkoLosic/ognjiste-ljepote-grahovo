import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import generic1 from "@/assets/village-generic-1.jpg";
import generic2 from "@/assets/village-generic-2.jpg";
import generic3 from "@/assets/village-generic-3.jpg";
import generic4 from "@/assets/village-generic-4.jpg";

const genericImages = [generic1, generic2, generic3, generic4];

type Village = {
  name: string;
  description: string;
  details: string;
  image: string;
};

// Sela opštine Bosansko Grahovo koja nisu prikazana na stranici "Grad i sela"
const otherVillages: Village[] = [
  {
    name: "Bastasi",
    description:
      "Selo u sastavu opštine Bosansko Grahovo, smješteno u podnožju okolnih planina.",
    details:
      "Bastasi su naselje smješteno u podnožju planina koje okružuju grahovsku kotlinu. Kraj je bogat šumama, izvorima pitke vode i pašnjacima, a mještani se tradicionalno bave stočarstvom i poljoprivredom. Selo čuva autentični seoski ambijent i tradicionalnu arhitekturu.",
    image: generic1,
  },
  {
    name: "Crnac",
    description:
      "Tradicionalno selo grahovskog kraja okruženo šumama i livadama.",
    details:
      "Crnac je tradicionalno selo grahovskog kraja, okruženo gustim šumama i prostranim livadama. Mirna lokacija i očuvana priroda čine ga privlačnim za posjetioce koji traže predah od gradskog života i autentično iskustvo seoske svakodnevice.",
    image: generic2,
  },
  {
    name: "Donje Peulje",
    description:
      "Selo u jugoistočnom dijelu opštine, okruženo pašnjacima i šumama planine Staretine.",
    details:
      "Donje Peulje su smještene na padinama planine Staretine, u jugoistočnom dijelu opštine Bosansko Grahovo. Selo je tradicionalno orijentirano na stočarstvo i poljoprivredu, a okolni pašnjaci i šume oduvijek su bili glavni izvor egzistencije mještana. Iz sela se pruža predivan pogled na grahovska polja i okolne planinske vrhove.",
    image: generic3,
  },
  {
    name: "Donji Kazanci",
    description:
      "Naselje u zapadnom dijelu opštine, blizu planine Dinare.",
    details:
      "Donji Kazanci se nalaze u zapadnom dijelu opštine Bosansko Grahovo, u blizini moćne planine Dinare. Položaj sela omogućava lijep pogled na dinarske vrhove, a okolni teren je idealan za planinarenje i istraživanje krških fenomena karakterističnih za ovaj kraj.",
    image: generic4,
  },
  {
    name: "Donji Tiškovac",
    description:
      "Selo poznato po željezničkoj stanici na pruzi Bosanski Novi – Knin.",
    details:
      "Donji Tiškovac je posebno zanimljivo selo zbog željezničke stanice koja se nalazi na pruzi Bosanski Novi – Knin. Pruga prolazi kroz područje opštine u dužini od oko 1700 metara, a Donji Tiškovac je jedna od ključnih tačaka tog koridora. Selo ima dugu tradiciju vezanu za željeznicu.",
    image: generic1,
  },
  {
    name: "Duler",
    description:
      "Malo seosko naselje grahovskog kraja okruženo netaknutom prirodom.",
    details:
      "Duler je malo seosko naselje grahovskog kraja, okruženo netaknutom prirodom. Selo je idealno za posjetioce koji traže mir, tišinu i autentično iskustvo života u skladu sa prirodom. Tradicionalna arhitektura kuća svjedoči o bogatoj prošlosti ovog kraja.",
    image: generic2,
  },
  {
    name: "Gornje Peulje",
    description:
      "Naselje na padinama Staretine, sa pogledom na prostrana grahovska polja.",
    details:
      "Gornje Peulje su naselje smješteno na višoj nadmorskoj visini od Donjih Peulja, na padinama planine Staretine. Bogato izvorima pitke vode i okruženo bukovim i hrastovim šumama, mjesto je idealno za planinare i ljubitelje netaknute prirode. Tradicionalna kamena gradnja kuća svjedoči o bogatoj prošlosti ovog kraja.",
    image: generic3,
  },
  {
    name: "Gornji Kazanci",
    description:
      "Selo na većoj nadmorskoj visini od Donjih Kazanaca, blizu Dinare.",
    details:
      "Gornji Kazanci se nalaze na većoj nadmorskoj visini u zapadnom dijelu opštine, u blizini planine Dinare. Selo nudi prelijepe poglede na okolne planinske masive, a okolina je bogata pašnjacima, šumama i krškim fenomenima karakterističnim za ovaj kraj.",
    image: generic4,
  },
  {
    name: "Grkovci",
    description:
      "Tradicionalno selo u kraškoj dolini, poznato po izvorima pitke vode.",
    details:
      "Grkovci se nalaze u tipičnoj kraškoj dolini, sa brojnim izvorima pitke vode koji su oduvijek napajali mještane i njihova stada. Selo čuva tradicionalnu arhitekturu sa kamenim kućama i suhozidima koji okružuju imanja. Mještani se i danas bave stočarstvom i čuvaju stare običaje.",
    image: generic1,
  },
  {
    name: "Isjek",
    description:
      "Mirno seosko naselje okruženo šumama, idealno za odmor u prirodi.",
    details:
      "Isjek je malo, mirno selo okruženo gustim šumama. Udaljeno od glavnih saobraćajnica, predstavlja oazu mira i tišine. Pogodno je za posjetioce koji traže odmor u netaknutoj prirodi, šetnje šumskim stazama i upoznavanje sa tradicionalnim načinom života.",
    image: generic2,
  },
  {
    name: "Jaruga",
    description:
      "Selo smješteno uz potok, sa očuvanom prirodom i tradicionalnom arhitekturom.",
    details:
      "Jaruga se nalazi uz istoimeni potok koji prolazi kroz selo i čini ga posebno privlačnim. Mještani su sačuvali tradicionalnu arhitekturu sa kamenim kućama i drvenim mostićima preko potoka. Okolne livade i šume bogate su biljnim i životinjskim svijetom.",
    image: generic3,
  },
  {
    name: "Kesići",
    description:
      "Tradicionalno selo grahovskog kraja sa očuvanom seoskom arhitekturom.",
    details:
      "Kesići su tradicionalno selo grahovskog kraja koje je sačuvalo autentičnu seosku arhitekturu i način života. Okolne livade, šume i pašnjaci čine ovo mjesto privlačnim za ljubitelje netaknute prirode i seoskog turizma.",
    image: generic4,
  },
  {
    name: "Luka",
    description: "Malo selo na obroncima planina, poznato po pitkim izvorima.",
    details:
      "Luka je tradicionalno malo selo smješteno na obroncima planina koje okružuju grahovsku kotlinu. Brojni izvori pitke vode su prepoznatljiv simbol ovog mjesta. Mještani njeguju stare zanate i običaje, a selo je odlična polazna tačka za izlete u okolnu prirodu.",
    image: generic1,
  },
  {
    name: "Maleševci",
    description:
      "Selo u brdovitom predjelu, sa autentičnim seoskim ambijentom.",
    details:
      "Maleševci leže u brdovitom predjelu opštine, sa autentičnim seoskim ambijentom koji je odolio modernim promjenama. Stari kameni objekti, suhozidi i tradicionalne staze daju mjestu poseban šarm. Selo je idealno za one koji žele da osjete duh starog grahovskog kraja.",
    image: generic2,
  },
  {
    name: "Malo Tičevo",
    description:
      "Selo na tičevskoj visoravni, dio prolaza prema Glamoču.",
    details:
      "Malo Tičevo se nalazi na tičevskoj visoravni, na nadmorskoj visini od oko 1098 metara. Visoravan predstavlja prirodni prolaz prema opštini Glamoč i bogata je pašnjacima i šumama. Sa sela se pruža impresivan pogled na okolne planinske masive.",
    image: generic3,
  },
  {
    name: "Marinkovci",
    description: "Naselje u dolini, okruženo livadama i šumama.",
    details:
      "Marinkovci su smješteni u plodnoj dolini, okruženi prostranim livadama i šumama. Selo je tradicionalno orijentirano na poljoprivredu i stočarstvo. Mirna atmosfera i lijepi prirodni pejzaži privlače posjetioce koji traže predah od gradskog života.",
    image: generic4,
  },
  {
    name: "Mračaj",
    description:
      "Selo na nadmorskoj visini od oko 400 m, najniža tačka opštine.",
    details:
      "Mračaj se nalazi na nadmorskoj visini od oko 400 metara i predstavlja najnižu tačku opštine Bosansko Grahovo. Zbog povoljnog položaja i blaže klime, selo ima karakterističan biljni svijet. Okolina je bogata šumama i potocima, a sam položaj sela ga čini posebno zanimljivim za istraživanje.",
    image: generic1,
  },
  {
    name: "Mramorje",
    description:
      "Naselje grahovskog kraja sa očuvanom prirodom i tradicijom.",
    details:
      "Mramorje je naselje grahovskog kraja koje čuva bogatstvo prirode i kulturnog nasljeđa. Okolne šume i livade pružaju idealne uslove za stočarstvo, a mještani njeguju tradicionalan način života koji je očuvan kroz generacije.",
    image: generic2,
  },
  {
    name: "Nuglašica",
    description: "Tradicionalno selo grahovskog kraja, sa bogatom prirodom.",
    details:
      "Nuglašica je tradicionalno selo grahovskog kraja koje čuva bogatstvo prirode i kulturnog nasljeđa. Okolne šume, livade i izvori vode čine ovo mjesto privlačnim za sve ljubitelje seoskog turizma i tradicionalnog načina života.",
    image: generic3,
  },
  {
    name: "Pečenci",
    description:
      "Mirno seosko naselje okruženo livadama i šumama grahovskog kraja.",
    details:
      "Pečenci su mirno seosko naselje grahovskog kraja, okruženo prostranim livadama i šumama. Selo je idealno za posjetioce koji traže mir, tišinu i predah u krilu prirode. Tradicionalni način života i očuvana arhitektura čine ga posebno privlačnim.",
    image: generic4,
  },
  {
    name: "Pržine",
    description:
      "Selo grahovskog kraja okruženo pašnjacima i šumama.",
    details:
      "Pržine su selo grahovskog kraja okruženo prostranim pašnjacima i šumama. Mještani se tradicionalno bave stočarstvom, a okolni krški pejzaž daje selu jedinstven karakter. Mirno okruženje čini ga privlačnim za sve koji žele da iskuse autentični seoski život.",
    image: generic1,
  },
  {
    name: "Radlovići",
    description:
      "Mirno seosko naselje sa očuvanim tradicionalnim načinom života.",
    details:
      "Radlovići su mirno seosko naselje gdje je tradicionalni način života ostao gotovo netaknut. Posjetioci mogu da iskuse autentičnu seosku svakodnevicu, probaju domaće proizvode i upoznaju se sa starim zanatima koje mještani njeguju kroz generacije.",
    image: generic2,
  },
  {
    name: "Ugarci",
    description: "Naselje u dolini, okruženo planinama i šumama.",
    details:
      "Ugarci su naselje smješteno u dolini, okruženo visokim planinama i gustim šumama. Mirna i zaštićena lokacija čini selo idealnim za odmor i rekreaciju. Tradicionalna gradnja i očuvana priroda daju Ugarcima poseban karakter.",
    image: generic3,
  },
  {
    name: "Varoš",
    description:
      "Naselje grahovskog kraja sa bogatom istorijom i tradicijom.",
    details:
      "Varoš je naselje grahovskog kraja sa bogatom istorijom i tradicijom. Smješteno u prirodnom ambijentu, čuva autentični duh ovog dijela Bosne. Mještani se bave tradicionalnim djelatnostima, a okolina pruža brojne mogućnosti za istraživanje.",
    image: generic4,
  },
  {
    name: "Veliko Tičevo",
    description:
      "Veće naselje na tičevskoj visoravni, prolaz prema Glamoču.",
    details:
      "Veliko Tičevo se nalazi na tičevskoj visoravni, na nadmorskoj visini od 1098 metara, i predstavlja veće naselje ovog dijela opštine. Visoravan je važan prirodni prolaz prema opštini Glamoč. Bogata pašnjacima i šumama, ovo područje je takođe značajna saobraćajna tačka grahovskog kraja.",
    image: generic1,
  },
  {
    name: "Vidovići",
    description:
      "Selo na padinama planine, sa pogledom na okolna polja.",
    details:
      "Vidovići su smješteni na padinama planine, sa kojih se pruža prelijep pogled na okolna grahovska polja. Selo je dobilo ime po porodici Vidović, a tradicionalna kamena arhitektura kuća svjedoči o bogatoj prošlosti ovog mjesta.",
    image: generic2,
  },
  {
    name: "Zaseok",
    description:
      "Malo naselje grahovskog kraja okruženo netaknutom prirodom.",
    details:
      "Zaseok je malo naselje grahovskog kraja okruženo netaknutom prirodom. Mirna lokacija, čisti zrak i blizina šuma čine ga idealnim za odmor i rekreaciju. Tradicionalni način života mještana čuva autentični duh ovog dijela Bosne.",
    image: generic3,
  },
  {
    name: "Zebe",
    description:
      "Tradicionalno selo grahovskog kraja sa očuvanom prirodom.",
    details:
      "Zebe su tradicionalno selo grahovskog kraja sa očuvanom prirodom i tradicijom. Okolni pašnjaci, šume i izvori vode čine ovo mjesto privlačnim za ljubitelje seoskog turizma. Mještani njeguju stare običaje i tradicionalne djelatnosti.",
    image: generic4,
  },
];

export default function OstalaSela() {
  const [selected, setSelected] = useState<Village | null>(null);

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
              čine bogatu zajednicu grahovskog kraja. Kliknite na karticu za
              detaljniji prikaz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Villages Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {otherVillages.map((village, index) => (
              <motion.button
                key={village.name}
                type="button"
                onClick={() => setSelected(village)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
                className="card-nature group text-left flex flex-col overflow-hidden cursor-pointer hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={village.image}
                    alt={village.name}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                    {village.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {village.description}
                  </p>
                  <span className="mt-4 text-accent text-sm font-medium">
                    Detaljnije →
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-12 max-w-2xl mx-auto italic">
            Napomena: Lista obuhvata naselja u sastavu opštine Bosansko Grahovo.
            Imena i opisi mogu biti dopunjeni dodatnim podacima.
          </p>
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {selected && (
            <>
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl sm:text-3xl text-foreground">
                    {selected.name}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground text-base leading-relaxed pt-2 whitespace-pre-line">
                    {selected.details}
                  </DialogDescription>
                </DialogHeader>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
