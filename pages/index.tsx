'use client'

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  Disclosure,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';


import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';

import Bridge from "../components/Icons/Bridge";
import Logo from "../components/Icons/Logo";
import Modal from "../components/Modal";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
];
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>Adidas Collection</title>
      </Head>

      {/* Navigation Header */}
      <header className="bg-white">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="-m-2.5 p-2.5 text-gray-700">
              <Bars3Icon className="size-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                Product
                <ChevronDownIcon className="size-5 text-gray-400" />
              </PopoverButton>
              <PopoverPanel className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md bg-white rounded-3xl shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div key={item.name} className="flex items-center gap-x-6 p-4 hover:bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center bg-gray-50 rounded-lg p-2">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                      </div>
                      <div>
                        <a href={item.href} className="font-semibold text-gray-900">{item.name}</a>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>
            <a href="#" className="text-sm font-semibold text-gray-900">Features</a>
            <a href="#" className="text-sm font-semibold text-gray-900">Marketplace</a>
            <a href="#" className="text-sm font-semibold text-gray-900">Company</a>
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold text-gray-900">Log in →</a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/25" aria-hidden="true" /> {/* This will serve as the overlay */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="bg-white px-6 py-6 sm:max-w-sm sm:mx-auto sm:my-8 sm:rounded-lg">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" alt="" />
                </a>
                <button onClick={() => setMobileMenuOpen(false)} className="-m-2.5 p-2.5 text-gray-700">
                  <XMarkIcon className="size-6" />
                </button>
              </div>
              <div className="mt-6">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between text-left font-semibold text-gray-900">
                        Product
                        <ChevronDownIcon className={`size-5 transition-transform ${open ? "rotate-180" : ""}`} />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2">
                        {[...products, ...callsToAction].map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block py-2 text-sm text-gray-700 hover:text-indigo-600"
                          >
                            {item.name}
                          </a>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </Dialog>


      </header>

      {/* Main Gallery Content */}
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && <Modal images={images} onClose={() => setLastViewedPhoto(photoId)} />}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="group relative mb-5 block w-full cursor-zoom-in after:absolute after:inset-0 after:rounded-lg after:shadow-highlight after:content-['']"
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition group-hover:brightness-110"
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
              />
            </Link>
          ))}
        </div>
      </main>

      <footer className="p-6 text-center text-white/80 sm:p-12">
        Thank you to{" "}
        <a href="https://vercel.app/" target="_blank" className="font-semibold hover:text-white" rel="noreferrer">Vercel.app</a>,{" "}
        <a href="https://www.cloudinary.com/" target="_blank" className="font-semibold hover:text-white" rel="noreferrer">Cloudinary</a>, and{" "}
        <a href="https://adidas.co.id/" target="_blank" className="font-semibold hover:text-white" rel="noreferrer">Adidas</a> for the pictures.
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

  let reducedResults: ImageProps[] = results.resources.map((result, i) => ({
    id: i,
    height: result.height,
    width: result.width,
    public_id: result.public_id,
    format: result.format,
  }));

  const blurImagePromises = results.resources.map(getBase64ImageUrl);
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    props: { images: reducedResults },
  };
}
