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
      "Malo selo sa istorijskim rudnikom boksita iz doba kralja Tvrtka I Kotromanića.",
    details:
      "Bastasi su malo selo smješteno u opštini Bosansko Grahovo, na nadmorskoj visini tipičnoj za dinarski kraški reljef ovog područja. Prema popisu stanovništva iz 2013. godine, u selu je živjelo 20 stanovnika, isključivo srpske nacionalnosti. Iako malo po veličini, Bastasi su zanimljivi sa istorijskog aspekta — u ovom kraju potvrđeno je postojanje starog rudnika boksita koji je, prema istorijskim pretpostavkama, bio otvoren još u doba vladavine bosanskog kralja Tvrtka I Kotromanića, u periodu bosanskog kraljevstva. U blizini Bastasa, u susjednoj opštini Drvar, nalazi se i poznati hidrološki fenomen — kraško vrelo Bastašica, sa kojim je ponorski sistem Resanovačkih pećina povezan podzemnim vodotocima. Prema istraživanjima iz 1969. godine, utvrđena je veza između ponora Struge i Bastašice bojenjem vode, pri čemu pravolinijska udaljenost iznosi 11 km. Selo je asfaltnim putem povezano sa centrom opštine Bosansko Grahovo.",
    image: generic1,
  },
  {
    name: "Crnac",
    description:
      "Selo u karakterističnom kraškom ambijentu zapadne Bosne, oslonjeno na stočarstvo i šumarstvo.",
    details:
      "Crnac je selo u opštini Bosansko Grahovo koje se smjestilo u karakterističnom kraškom ambijentu zapadne Bosne. Kao i većina grahovskih naselja, i Crnac se nalazi na obodima kraških polja, zaštićen od vjetra i nepogoda brdskim padinama koje prirodno okružuju Grahovsko polje. Selo pripada karakterističnom dinarsko-planinskom pejzažu ovog dijela BiH, u kojem se smjenjuju pašnjaci, livade i šumska bogatstva. Stanovnici su se tradicionalno bavili stočarstvom i šumarstvom, što ostaje i danas jedan od rijetkih privrednih potencijala ovog kraja. Crnac je, poput ostalih sela opštine, asfaltnom putnom mrežom spojen sa centrom opštine.",
    image: generic2,
  },
  {
    name: "Crni Lug",
    description:
      "Sjedište Mjesne zajednice koja obuhvata veći broj okolnih naselja grahovskog kraja.",
    details:
      "Crni Lug je selo u opštini Bosansko Grahovo sa dugom istorijskom tradicijom na ovom prostoru. Administrativno je bio dio Sreza Bosanskog Grahova i tokom Drugog svjetskog rata. Crni Lug je sjedište Mjesne zajednice koja obuhvata veći broj okolnih naselja — Gornje i Donje Peulje, Gornje i Donje Kazance, Nuglašicu, Bastase, Jarugu, Pržine i Grkovce. Pored sela protiče kraški vodotok, a okolina obiluje livadama i šumama bukve i jele karakterističnim za dinarski planinski pojas. Prema evidencijama o povratku, u MZ Crni Lug nakon rata se ukupno vratilo oko 730 lica. U selu je zabilježeno istorijsko prisustvo još od prvih doseljavanja Slovena u ovaj kraj, a u blizini su otkriveni i ostaci iz rimskog perioda. Crni Lug je asfaltnim putem dobro spojen sa ostalim naseljima opštine i njenim sjedištem.",
    image: generic3,
  },
  {
    name: "Donje Peulje",
    description:
      "Naselje u sklopu MZ Crni Lug, obuhvaćeno projektima elektrifikacije povratničkih sela.",
    details:
      "Donje Peulje je naselje u opštini Bosansko Grahovo koje administrativno pripada Mjesnoj zajednici Crni Lug. Smješteno je u tipičnom dinarsko-kraškom reljefu, okruženo brdima i pašnjacima. Poput svih naselja ovog kraja, i Donje Peulje je u ratu 1990-ih pretrpjelo teška razaranja — stambeni objekti su u velikoj mjeri bili uništeni, a povratak stanovnika bio je postepen. U sklopu projekata elektrifikacije povratničkih naselja, Donje Peulje je bilo obuhvaćeno izgradnjom dalekovoda, zajedno sa selima Isjek i Radlovići. Tradicija ovog sela vezana je za stočarstvo i sitnu poljoprivredu, a okolni pašnjaci i šume pružaju povoljne uslove za ove djelatnosti i danas.",
    image: generic4,
  },
  {
    name: "Donji Kazanci",
    description:
      "Selo u okviru MZ Crni Lug, dvojno naselje sa Gornjim Kazancima.",
    details:
      "Donji Kazanci su selo u opštini Bosansko Grahovo, smješteno u okviru Mjesne zajednice Crni Lug. Zajedno sa Gornjim Kazancima čine jedno od karakterističnih dvojnih naselja ovog kraja u kojima gornji i donji dio nose ista osnovna imena, a razlikuju se po položaju na reljefu. Podaci o broju stanovnika ukazuju na izrazito malu populaciju, što je karakteristika gotovo svih naselja grahovske opštine. Stanovnici su se tradicionalno bavili stočarstvom, šumarstvom i sitnom poljoprivredom, koristeći prirodne resurse dinamičnog kraškog terena. Selo je smješteno na brdsko-planinskom obodu Grahovskog polja, na sunčanim padinama, što je tipično za raspored naselja u ovom kraju.",
    image: generic1,
  },
  {
    name: "Donji Tiškovac",
    description:
      "Istorijsko selo na granici sa Hrvatskom, mjesto ustanka 1875. godine.",
    details:
      "Donji Tiškovac je istorijski važno selo u opštini Bosansko Grahovo, smješteno u sjeverozapadnom dijelu opštine, uz granicu sa Republikom Hrvatskom. Prema popisu iz 2013. godine, u selu je živjelo 33 stanovnika, isključivo srpske nacionalnosti. Kroz područje ovog sela prolazi istorijska željeznička pruga Bosanski Novi–Knin u dužini od 1.700 metara, s tim što se stanica nalazi u obližnjem Bosanskom Drenovcu. Istorijsku važnost Donjeg Tiškovca potvrđuje i činjenica da se upravo ovdje, 15. septembra 1875. godine, odvijao jedan od ključnih trenutaka oslobodilačkog ustanka, kada su ustanici uz pomoć braće Plavanjaca zauzeli pograničnu kulu i protjerali osmanske vlasti sa ovog prostora. U blizini sela nalaze se i značajni vodni resursi — izvori koji su prepoznati kao potencijal za vodosnabdijevanje opštine.",
    image: generic2,
  },
  {
    name: "Duler",
    description:
      "Selo na zaštićenoj sunčanoj padini sa pristupom pašnjacima i šumama.",
    details:
      "Duler je selo u opštini Bosansko Grahovo, smješteno u okviru karakterističnog dinarskog planinskog pejzaža. Kao i većina grahovskih sela, i Duler je osnovan na prirodno povoljnoj lokaciji — na zaštićenoj sunčanoj padini sa pristupom pašnjacima i šumama. Stanovnici su se tradicionalno bavili stočarstvom i šumarstvom, koji su kroz istoriju bili osnova privređivanja u cijelom grahovskom kraju. Selo je asfaltnom putnom mrežom spojeno sa centrom opštine Bosansko Grahovo, a smješteno je u nizu manjih naselja koja tvore gustu mrežu zajednica raspoređenih po obodima kraških polja i brdskim padinama opštine.",
    image: generic3,
  },
  {
    name: "Gornje Peulje",
    description:
      "Gornji dio dvojnog naselja Peulja, na brdskim padinama iznad kraških polja.",
    details:
      "Gornje Peulje je naselje u opštini Bosansko Grahovo, gornji dio geografsko-administrativne cjeline Peulja, koje zajedno sa Donjim Peuljem tvori tipično dvojno dinarsko naselje. Pripada Mjesnoj zajednici Crni Lug. Smješteno je na brdskim padinama iznad kraških polja, okruženo šumom i pašnjacima pogodnim za stočarstvo. Ratna razaranja 1990-ih teško su pogodila i ovo selo, ali su se povratnici postepeno vraćali. Kao i u cijeloj opštini, prirodno okruženje nudi potencijale za razvoj tradicionalnog stočarstva i ekološke poljoprivrede, što ostaje oslonac ekonomskog opstanka povratničkih domaćinstava.",
    image: generic4,
  },
  {
    name: "Gornji Kazanci",
    description:
      "Selo iznad Donjih Kazanaca na brdskim padinama dinarskog terena.",
    details:
      "Gornji Kazanci su selo u opštini Bosansko Grahovo, smješteno iznad Donjih Kazanaca na brdskim padinama karakterističnog dinarskog terena. Poput svih grahovskih naselja, smješteno je na sunčanoj i od vjetra zaštićenoj padini, sa lakim pristupom pašnjacima i šumskim površinama. Selo administrativno pripada Mjesnoj zajednici Crni Lug. Stanovnici Gornjih Kazanaca bavili su se kroz generacije stočarstvom i sitnom poljoprivredom, koristeći bogate livade i pašnjake ovog kraja. Rat 1990-ih donio je teška razaranja, ali se postepeno odvijao povratak u okviru šireg procesa obnove grahovske opštine.",
    image: generic1,
  },
  {
    name: "Grkovci",
    description:
      "Selo sa gradinom starom 3000 godina i pretpostavljenim rimskim Stridonom.",
    details:
      "Grkovci su selo sa izuzetno dugom istorijskom tradicijom u opštini Bosansko Grahovo. Prema popisu iz 2013. godine, u selu je živjelo 74 stanovnika, isključivo srpske nacionalnosti. Gradina u okolini Grkovaca osnovana je oko 1.000 godina prije nove ere i bila je neprekidno nastanjena sve do propasti Rimskog carstva u VI vijeku. Na ovom prostoru živjelo je ilirsko pleme Dicioni, koje su tokom rimskog perioda pokorili Rimljani u sklopu gušenja ilirsko-panonske bune. Izuzetno važan istorijski nalaz su rimski nadgrobni natpisi pronađeni u blizini policijske stanice u Grkovcima tokom 1970-ih godina — ti natpisi potvrđuju intenzivan rimski život u ovom kraju i dali su osnovu za hipotezu da se upravo ovdje nalazio rimski grad Stridon, rodni grad svetog Jeronima. Pored bogate prošlosti, Grkovci su tipično agrarno selo sa tradicijom stočarstva i uzgoja kultura prilagođenih klimi dinarskog visočja.",
    image: generic2,
  },
  {
    name: "Isjek",
    description:
      "Malo selo obuhvaćeno projektom elektrifikacije povratničkih naselja.",
    details:
      "Isjek je malo selo u opštini Bosansko Grahovo, smješteno na brdskom terenu karakterističnom za ovaj kraj. Zajedno sa Donjim Peuljem i Radlovićima, Isjek je bio obuhvaćen projektom elektrifikacije povratničkih naselja, u sklopu kojeg je izgrađen dalekovod kako bi se omogućio povratak i osnovna infrastruktura za stanovnike koji su se vratili nakon ratnih razaranja 1990-ih. Selo se privredno oslanja na stočarstvo i šumarstvo, a okruženo je pašnjacima i šumskim površinama tipičnim za dinarski planinski pojas. Isjek je putem spojen sa centrom opštine i okolnim selima.",
    image: generic3,
  },
  {
    name: "Jaruga",
    description:
      "Naselje MZ Crni Lug u okrilju dinarskih brda i kraških jaruga.",
    details:
      "Jaruga je naselje u opštini Bosansko Grahovo koje administrativno pripada Mjesnoj zajednici Crni Lug. Naziv sela, koji u srpskom jeziku opisuje uski, udubini sličan teren, vjerovatno govori o geografskom karakteru mjesta — jaruge su karakteristično obilježje kraškog terena u ovom dijelu BiH. Smješteno u okrilju dinarskih brda, selo je okruženo livadama i šumskim kompleksima koji su oduvijek bili osnova privređivanja mještana. Stanovnici su se bavili stočarstvom, a istorijski izvori potvrđuju prisustvo organizovanih zajednica u ovom kraju još od rimskog i predrimskog doba. Jaruga je asfaltnim putem spojena sa okolnim selima i središtem opštine Bosansko Grahovo.",
    image: generic4,
  },
  {
    name: "Kesići",
    description:
      "Rodno mjesto Đure Pucara Starog (1899–1979), sa praistorijskom gradinom.",
    details:
      "Kesići su selo u opštini Bosansko Grahovo sa posebnim istorijskim značajem — upravo ovdje, 1899. godine, rodio se Đuro Pucar Stari (1899–1979), istaknuti partijski i politički lider SFRJ, koji je bio predsjednik Bosne i Hercegovine i jedna od ključnih figura antifašističkog pokreta u ovom kraju. Sačuvana je tradicija sjećanja na ovog lokalnog sina buntovne Krajine koji je obilježio istoriju cijele regije. Između sela Kesići i Maleševci, tokom arheoloških istraživanja, pronađena je gradina — utvrđeno praistorijsko naselje koje potvrđuje kontinuitet ljudskog prisustva na ovom prostoru još od davnih vremena. Kao i ostala grahovska sela, i Kesići se odlikuju tipičnim dinarskim pejzažem sa livadama, šumama i kraškim formacijama.",
    image: generic1,
  },
  {
    name: "Korita",
    description:
      "Selo u kraškom ambijentu, naziv po geomorfološkim formacijama dinarskog krša.",
    details:
      "Korita su selo u opštini Bosansko Grahovo smješteno u karakterističnom kraškom ambijentu ovog dijela jugozapadne Bosne. Naziv \"korita\" odnosi se na kraška korita — specifične geomorfološke formacije nastale otapanjem krečnjaka u dinarskom kršu. Kao i veći dio grahovskih sela, Korita su svjedočila teškim iskušenjima tokom rata 1990-ih, ali su se stanovnici postepeno vraćali i nastavljali sa obnavljanjem zajednice. Primarna djelatnost mještana kroz istoriju bilo je stočarstvo, uz korišćenje bogatih pašnjaka i livada koji i danas čine prepoznatljivo obilježje ovog kraja. Korita su asfaltnom cestom spojena sa mrežom puteva koji vode prema centru opštine.",
    image: generic2,
  },
  {
    name: "Luka",
    description:
      "Istorijsko selo sa grobovima iz ranog bronzanog doba (oko 2300. p.n.e.).",
    details:
      "Luka je istorijski značajno selo u opštini Bosansko Grahovo, čija istorija seže do ranog bronzanog doba. Naime, u blizini sela Luke otkriveni su grobovi koji potiču iz otprilike 2.300. godine p. n. e., što je jedan od najranijih dokaza o organizovanom životu na prostoru Bosanskog Grahova. Ovi nalazi svjedoče o hiljadugodišnjoj kontinuiranoj prisutnosti čovjeka u ovom kraju, koji je zahvaljujući svojoj geografskoj poziciji između planina bio pogodan za organizovani zajednički život. Poput ostalih grahovskih naselja, i Luka se u privređivanju oslanjala na stočarstvo i sitnu poljoprivredu. Smještena u kraškom terenu, okružena je pašnjacima i šumama karakterističnim za dinarski planinski pojas.",
    image: generic3,
  },
  {
    name: "Maleševci",
    description:
      "Selo sa praistorijskom gradinom između Maleševaca i Kesića.",
    details:
      "Maleševci su selo u opštini Bosansko Grahovo, smješteno u tipičnom dinarsko-kraškom pejzažu. U blizini Maleševaca, u prostoru između ovog sela i Kesića, pronađena je praistorijska gradina — utvrđeno naselje koje potvrđuje kontinuitet ljudskog prisustva na ovom prostoru još iz praistorijskog doba. Stanovnici Maleševaca bavili su se kroz generacije stočarstvom i poljoprivredom, prilagođavajući svoju privređivačku strategiju tvrdim uslovima dinarskog visočja. Selo je asfaltnom putnom vezom spojeno sa mrežom opštinskih puteva i centrom Bosanskog Grahova.",
    image: generic4,
  },
  {
    name: "Malo Tičevo",
    description:
      "Naselje koje sa Velikim Tičevom tvori geografsku i istorijsku cjelinu.",
    details:
      "Malo Tičevo je naselje u opštini Bosansko Grahovo koje zajedno sa Velikim Tičevom tvori geografsku i istorijsku cjelinu u ovom kraju. Smješteno je u tipičnom dinarskom pejzažu okruženom brdima i šumama. Naziv \"Tičevo\" ima istorijsko porijeklo i vezan je za tradiciju ovog kraja. Kao i ostala manja sela opštine, i Malo Tičevo je pretrpjelo teška ratna razaranja 1990-ih, a broj povratnika je ostao skroman. Prirodni potencijali — pašnjaci, šume i čist vazduh dinarskog visočja — ostaju vrijednost ovog kraja i osnova za razvoj održive i ekološke privrede.",
    image: generic1,
  },
  {
    name: "Marinkovci",
    description:
      "Malo seosko naselje nazvano po porodici Marinka, u dinarskim brdima.",
    details:
      "Marinkovci su malo seosko naselje u opštini Bosansko Grahovo, smješteno u okrilju dinarskih brda i kraških polja. Karakteristično po tipu porodičnog prezimena u imenu (Marinkovci — potomci Marinka), što je tipičan model imenovanja sela u ovom kraju, Marinkovci su tipična zaokružena seoska zajednica nastala od proširene porodice ili roda koji je naselio određeno područje. Stanovnici su se bavili tradicionalnom seoskom privredom — stočarstvom, sitnom poljoprivredom i iskorišćavanjem šumskih resursa. Kao i sva grahovska sela, i Marinkovci su asfaltnom cestom povezani sa centrom opštine.",
    image: generic2,
  },
  {
    name: "Mračaj",
    description:
      "Selo na najnižoj nadmorskoj visini opštine — svega oko 400 metara.",
    details:
      "Mračaj je posebno zanimljivo selo u opštini Bosansko Grahovo jer se nalazi na najnižoj nadmorskoj visini u čitavoj opštini — svega oko 400 metara. Ova geografska specifičnost čini Mračaj izuzetnim, jer se sva ostala grahovska naselja nalaze na znatno višim nadmorskim visinama, uobičajeno između 800 i 870 m. Niža nadmorska visina znači i blažu mikroklimu, što je pogodovalo razvoju sela. Mračaj je smješten u dolini ili uvali, zaštićen od vjetra, sa pristupom vodotocima — izvori u selu Mračaj prepoznati su kao jedan od značajnijih hidroloških potencijala opštine. Tradicionalna privreda sela bila je stočarstvo i poljoprivreda, uz korišćenje povoljnijeg klimatskog položaja u odnosu na viša sela.",
    image: generic3,
  },
  {
    name: "Mramorje",
    description:
      "Naselje sa mramornim stećcima i ostacima antičkog kultnog mjesta.",
    details:
      "Mramorje je naselje u opštini Bosansko Grahovo sa izraženim istorijskim i arheološkim nasljeđem. Naziv \"Mramorje\" direktno upućuje na mramorne stećke — monumentalne nadgrobne kamene ploče bosanskih krstjana iz srednjovjekovnog perioda. Na lokalitetu Mramorje pronađeni su stećci, kao i ostaci antičkog kultnog mjesta: pronađena je ara posvećena rimskom božanstvu Silvanu Mesoru, kao i dijelovi crkvenog namještaja iz kasne antike. Ova otkrića svjedoče o dugom kontinuitetu sakralnog i kulturnog života na ovom lokalitetu, od antike do bosanskog srednjovjekovlja. Mramorje je smješteno uz put Livno–Grahovo i pruža izuzetan kulturno-istorijski potencijal za razvoj turizma u opštini.",
    image: generic4,
  },
  {
    name: "Nuglašica",
    description:
      "Selo sa prirodnim Nuglašičkim jezerom u Livanjskom polju.",
    details:
      "Nuglašica je selo u opštini Bosansko Grahovo, smješteno u zoni Livanjskog polja koje pripada grahovskoj opštini. U blizini sela nalazi se Nuglašičko jezero — prirodno jezero u Livanjskom polju, jedno od tri prirodna jezera na prostoru opštine (uz Šatorsko jezero i Pečenačko jezero). Nuglašičko jezero prepoznato je kao potencijalni resurs za razvoj ribarstva i eko-turizma u opštini. Administrativno, Nuglašica pripada Mjesnoj zajednici Crni Lug. Tradicionalna privreda sela temeljila se na stočarstvu i korišćenju bogatih pašnjaka Livanjskog polja, koji su od davnina bili izuzetno pogodni za uzgoj stoke i ovaca.",
    image: generic1,
  },
  {
    name: "Pečenci",
    description:
      "Selo uz Pečenačko jezero, jedno od tri prirodna jezera u opštini.",
    details:
      "Pečenci su selo u opštini Bosansko Grahovo smješteno u okrilju kraških polja i dinarskog planinskog terena. U blizini sela nalazi se Pečenačko jezero — prirodno jezero u Grahovskom polju, jedno od tri prirodna jezera na prostoru opštine, pored Šatorskog i Nuglašičkog. Ovo jezero ima potencijal za razvoj ribarstva i rekreativnog turizma. Kao i ostala grahovska sela, i Pečenci imaju dugu tradicionalnu privredu utemeljenu na stočarstvu i korišćenju bogatih pašnjaka koji okružuju Grahovsko polje. Selo je asfaltnom cestom spojen s centrom opštine.",
    image: generic2,
  },
  {
    name: "Pržine",
    description:
      "Selo sa stećcima Dobrih Bošnjana iz 12. vijeka i bivšim rasadnikom drveća.",
    details:
      "Pržine su historijski i kulturno značajno selo u opštini Bosansko Grahovo. U selu i njegovoj okolini sačuvani su stećci \"Dobrih Bošnjana\" — monumentalni nadgrobni kameni blokovi koji potiču iz 12. vijeka i svjedoče o prisutnosti bosanskih krstjana (Crkve bosanske) na ovom prostoru u periodu bosanskog srednjovjekovlja. Ovi stećci, osim historijskog, imaju i izuzetnu estetsku i kulturnu vrijednost, kao dio fenomena koji je u cijelosti upisan na UNESCO-ovu Listu svjetske baštine. U selu Pržine zabilježen je i rasadnik za uzgoj sadnica četinarskog i lišćarskog drveća — Rasadnik Pržine — koji je do ratnih razaranja zapošljavao oko 120 radnika i predstavljao važan ekonomski subjekt opštine. U neposrednoj blizini sela, Separacija Pržine bavila se eksploatacijom šljunka i pijeska, što ostaje jedna od aktivnijih privrednih aktivnosti u opštini. Pržine su smještene u kraškom terenu s pristupom kvalitetnim pašnjacima i šumama.",
    image: generic3,
  },
  {
    name: "Radlovići",
    description:
      "Malo seosko naselje patronimskog porijekla, obnovljeno nakon rata 1990-ih.",
    details:
      "Radlovići su malo seosko naselje u opštini Bosansko Grahovo, smješteno na brdovitom terenu karakterističnom za dinarski krajobraz ovog područja. Naziv sela, poput mnogih u ovom kraju, potiče od patronimske tradicije — Radlovići su potomci Radla ili Radoja, što svjedoči o staroj porodičnoj tradiciji zajednice. Zajedno s Donjim Peuljem i Isjekom, Radlovići su bili obuhvaćeni projektom elektrifikacije povratničkih naselja (izgradnja dalekovoda), što svjedoči o naporima obnove zajednice nakon rata 1990-ih. Tradicija sela vezana je uz stočarstvo, uzgoj stoke na bogatim pašnjacima okolnih brda i livada, te korišćenje šumskih resursa.",
    image: generic4,
  },
  {
    name: "Ugarci",
    description:
      "Selo u dinarskom kraškom terenu, okruženo pašnjacima i šumama.",
    details:
      "Ugarci su selo u opštini Bosansko Grahovo, smješteno u okrilju dinarskog kraškog terena. Naziv \"Ugarci\" vjerovatno dolazi od staroslavenskog \"ugar\" — neobrađena ili neiskorišćena zemlja, što može upućivati na historijske uvjete prvog nastanjivanja ovog prostora. Kao i sva grahovska sela, i Ugarci su okruženi pašnjacima i šumama koje su kroz historiju bile osnova privređivanja — pretežno stočarstvo i korišćenje šumskih resursa. Ratna razaranja 1990-ih teško su pogodila i ovo selo, no programi obnove i podrška povratnicima doprinijeli su postupnoj obnovi zajednice.",
    image: generic1,
  },
  {
    name: "Uništa",
    description:
      "Tipično dinarsko planinsko selo okruženo pašnjacima, livadama i šumama.",
    details:
      "Uništa su naselje u opštini Bosansko Grahovo, administrativno smješteno u okviru teritorije ove jugozapadne bosanske opštine. Ime sela, premda na prvi pogled asocira na uništenje, vjerovatno ima predosmansko ili slavensko porijeklo i može biti vezano uz neki stariji apelativ ili lično ime. Uništa su tipično dinarsko planinskogorsko selo, okruženo pašnjacima, livadama i šumskim kompleksima. Kroz historiju stanovnici su se bavili stočarstvom i sitnom poljoprivredom. Kao i ostatak grahovske opštine, i Uništa su bila poprište teških ratnih sukoba 1990-ih, a obnova zajednice odvijala se postepeno kroz naredne decenije.",
    image: generic2,
  },
  {
    name: "Varoš",
    description:
      "Manje naselje s historijskim korijenima u urbanijoj funkciji ovog prostora.",
    details:
      "Varoš je naziv koji u bosanskom i srpskom jeziku historijski označava gradski, varoški dio naselja — zapravo mali gradić ili trg s razvijenom tržišnom funkcijom. U kontekstu opštine Bosansko Grahovo, Varoš je manje naselje s historijskim korijenima u urbanijoj funkciji ovog prostora. Grahovska Varoš bila je dio šire mreže naselja u Grahovskom polju, a njena historija isprepletena je s historijom cjelokupnog grahovskog kraja — od rimskog doba, kroz osmanski period, Austro-Ugarsku, pa do modernog doba. Danas Varoš ostaje malo, mirno naselje u sklopu opštine, okruženo kraški oblovanim brdima i zelenim pašnjacima.",
    image: generic3,
  },
  {
    name: "Veliko Tičevo",
    description:
      "Veće od dva istoimena Tičeva, u karakterističnom dinarskom krajoliku.",
    details:
      "Veliko Tičevo je veće od dva istoimena Tičeva u opštini Bosansko Grahovo i zajedno s Malim Tičevom tvori geografsku cjelinu. Smješteno je u karakterističnom dinarskom krajoliku, okruženo brdima, livadama i šumama. Ime \"Tičevo\" ima historijsko porijeklo koje je zabilježeno u topografiji ovog kraja. Kao i ostala grahovska sela, i Veliko Tičevo je pretrpjelo teška razaranja u ratu 1990-ih, ali se zajednica postepeno obnavljala. Okolni pašnjaci i šumska bogatstva nude potencijale za razvoj ekološke i tradicionalne stočarske privrede, što je i historijska osnova privređivanja ovog kraja.",
    image: generic4,
  },
  {
    name: "Vidovići",
    description:
      "Selo patronimskog porijekla u kraškom dinarskom terenu.",
    details:
      "Vidovići su selo u opštini Bosansko Grahovo, čiji naziv potiče od prezimena Vidović — što je patronimska tradicija imenovanja sela tipična za ovaj dio BiH. Smješteno u kraškom dinarskom terenu, okruženo brdima i livadama, Vidovići su kroz historiju bili tipično agrarno-stočarsko selo. Kraj poznate grahovske tradicije stočarstva, koji je oduvijek bio osnova privređivanja u ovom krajoliku bogatom pašnjacima, i Vidovići su bili sastavni dio te privredne logike. Ratna razaranja 1990-ih pogodila su i ovo selo, no povratak i obnova odvijali su se u sklopu opšteg procesa obnove grahovske opštine. Selo je putnom mrežom opštine spojen s Bosanskim Grahovom.",
    image: generic1,
  },
  {
    name: "Zaseok",
    description:
      "Malo seosko naselje — \"zaseok\" označava grupu kuća izvan glavnog jezgra.",
    details:
      "Zaseok je malo seosko naselje u opštini Bosansko Grahovo. Sam naziv \"zaseok\" je i apelativ koji u južnoslavenskim jezicima označava manji zaselak ili dio sela — zasebno smještenu grupu kuća izvan glavnog seoskog jezgra. Ovo govori o historijskom načinu organiziranja seoskog prostora u ovom kraju, gdje su se porodice i klanovi nastanjivali u odvojenim grupama kuća na brdskim padinama i uvala. Kao i ostala manja naselja opštine, Zaseok je okružen tipičnim dinarskim pejzažem — pašnjacima, šumama i kraškim formacijama — a privreda se temeljila na stočarstvu i korišćenju prirodnih resursa.",
    image: generic2,
  },
  {
    name: "Zebe",
    description:
      "Malo seosko naselje agrarno-stočarskog karaktera u dinarskom planinskom krajoliku.",
    details:
      "Zebe su malo seosko naselje u opštini Bosansko Grahovo, smješteno u okrilju dinarskog planinskog krajolik karakterističnog za ovaj kraj. Okruženo brdima i livadama, Zebe su tipično agrarno-stočarsko selo u sklopu sistema grahovskih sela raspoređenih po obodima kraških polja i brdskim padinama. Historija sela uklapa se u širu historiju grahovskog kraja — od prahistorijskog i rimskog naslijeđa, kroz srednji vijek i osmanski period, do modernog doba. Stanovnici su se bavili stočarstvom i sitnom poljoprivredom, a prirodno okruženje nudi potencijale za razvoj ekološkog turizma i ruralnog razvoja. Zebe su putnom mrežom opštine spojen s centrom Bosanskog Grahova.",
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
