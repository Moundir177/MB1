import React from 'react';
import type { Locale } from '@/i18n/settings';
import { getDictionary } from '@/i18n/get-dictionary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

// In a real app, this would come from a database or API
const getBlogPostBySlug = (slug: string) => {
  return {
    title: 'Getting Started with Web Development',
    content: `
      <p>Web development is an exciting field that combines creativity with technical skills. Whether you want to build websites, web applications, or interactive online experiences, understanding the fundamentals is essential.</p>
      
      <h2>HTML: The Building Blocks</h2>
      <p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure of web content using a series of elements that tell the browser how to display the content.</p>
      
      <h2>CSS: Making It Beautiful</h2>
      <p>CSS (Cascading Style Sheets) is used to style and layout web pages. With CSS, you can control the color, font, layout, and responsiveness of your website.</p>
      
      <h2>JavaScript: Adding Interactivity</h2>
      <p>JavaScript allows you to implement complex features on web pages. Every time a web page does more than just sit there and display static information, JavaScript is usually involved.</p>
      
      <h2>Frameworks and Libraries</h2>
      <p>Modern web development often involves using frameworks and libraries like React, Angular, Vue.js, Next.js, and many others that make development faster and more efficient.</p>
      
      <h2>Getting Started</h2>
      <p>The best way to learn web development is by doing. Start with simple HTML pages, add some CSS for styling, and gradually incorporate JavaScript for interactivity. There are numerous online resources, tutorials, and courses available to help you on your journey.</p>
    `,
    date: '2023-10-15',
    author: 'John Doe',
    image: '/images/blog/web-dev.jpg',
  };
};

export default async function BlogPost({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  const dict = await getDictionary(locale);
  const post = getBlogPostBySlug(slug);

  return (
    <main className="min-h-screen bg-neutral">
      <Header locale={locale} dictionary={dict} />
      <div className="container mx-auto px-4 py-12">
        <Link 
          href={`/${locale}/blog`}
          className="inline-block mb-8 text-primary hover:underline"
        >
          ← {dict.blog.backToBlog}
        </Link>
        
        <article className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="text-gray-600">
              {post.date} • {post.author}
            </div>
          </div>
          
          <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">{dict.blog.imageAlt}</span>
            </div>
          </div>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
      <Footer locale={locale} dictionary={dict} />
      <div className="fixed bottom-4 right-4 z-50">
        <LanguageSwitcher currentLocale={locale} />
      </div>
    </main>
  );
} 