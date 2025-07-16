"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "YanKapı nedir?",
    answer: "YanKapı, mahalle kültürünü yeniden canlandırmak ve komşuluk ilişkilerini güçlendirmek için tasarlanmış bir sosyal platformdur. Güvenli bir ortamda komşularınızla tanışmanızı, yardımlaşmanızı ve dayanışmanızı sağlar."
  },
  {
    question: "Nasıl üye olabilirim?",
    answer: "YanKapı'ya üye olmak için web sitemizden veya mobil uygulamamızdan 'Katıl' butonuna tıklayarak kayıt formunu doldurabilirsiniz. Adres doğrulaması için gerekli belgelerle birlikte başvurunuz incelenecektir."
  },
  {
    question: "Üyelik ücreti var mı?",
    answer: "YanKapı tamamen ücretsiz bir platformdur. Herhangi bir üyelik ücreti veya gizli ödeme bulunmamaktadır."
  },
  {
    question: "Nasıl güvenli olduğundan emin olabilirim?",
    answer: "Tüm kullanıcılarımız adres doğrulaması ve kimlik kontrolünden geçmektedir. Ayrıca, mesajlaşma sistemimiz uçtan uca şifrelidir ve kullanıcı bilgileri güvenli bir şekilde saklanmaktadır."
  },
  {
    question: "Mahalleme özel etkinlikleri nasıl görebilirim?",
    answer: "Üye olduktan sonra, mahallenize özel etkinlikler ana sayfanızda ve etkinlik takviminde otomatik olarak görüntülenecektir. Ayrıca, yeni etkinlikler için bildirim alabilirsiniz."
  }
]

export default function FAQPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-emerald-50 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
              <span className="text-emerald-600 text-sm font-medium">Sıkça Sorulan Sorular</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-900 bg-clip-text text-transparent">
              Size Nasıl Yardımcı Olabiliriz?
            </h1>
            <p className="text-xl text-gray-600">
              YanKapı hakkında merak ettiğiniz tüm soruların cevapları burada.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div variants={itemVariants}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                >
                  <AccordionItem value={`item-${index}`} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 py-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
