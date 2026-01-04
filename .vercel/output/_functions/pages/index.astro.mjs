/* empty css                                 */
import { e as createComponent, f as createAstro, r as renderTemplate, k as renderSlot, l as renderHead, m as maybeRenderHead, h as addAttribute, n as renderComponent } from '../chunks/astro/server_CHQoIW7e.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title = "SmoothDescent | GLP-1 Support System", description = "SmoothDescent | GLP-1 Support System" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en" class="scroll-smooth"> <head><meta charset="UTF-8"><meta name="description"', '><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/favicon.png"><meta name="generator"', "><title>", `</title><link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;500;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet"><!-- Google Tag Manager --><script>
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://data.smoothdescent.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PPNF3SQS');
        <\/script><!-- End Google Tag Manager --><!-- Meta Pixel Code --><script>
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '3411322232377394');
          fbq('track', 'PageView');
        <\/script>`, '<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=3411322232377394&ev=PageView&noscript=1"></noscript><!-- End Meta Pixel Code -->', '</head> <body> <!-- Google Tag Manager (noscript) --> <noscript><iframe src="https://data.smoothdescent.com/ns.html?id=GTM-PPNF3SQS" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> <!-- End Google Tag Manager (noscript) --> ', " </body> </html>"])), addAttribute(description, "content"), addAttribute(Astro2.generator, "content"), title, maybeRenderHead(), renderHead(), renderSlot($$result, $$slots["default"]));
}, "/Users/roshansanjeev/Desktop/MetabolicDefense/metabolic-defense-astro/src/layouts/BaseLayout.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Users/roshansanjeev/Desktop/MetabolicDefense/metabolic-defense-astro/src/Main", "client:component-export": "default" })} ` })}`;
}, "/Users/roshansanjeev/Desktop/MetabolicDefense/metabolic-defense-astro/src/pages/index.astro", void 0);

const $$file = "/Users/roshansanjeev/Desktop/MetabolicDefense/metabolic-defense-astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        default: $$Index,
        file: $$file,
        url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
