import { Dialog } from '@headlessui/react';  // Keep only this import
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  Bars3Icon,
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/20/solid';
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";

const Modal = ({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) => {
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      {/* Automatically managed overlay by Headless UI */}
      <div className="fixed inset-0 bg-black/25" aria-hidden="true" />

      <div className="fixed inset-0 z-50 overflow-y-auto">
        <Dialog.Panel className="mx-auto mt-16 bg-white p-6 rounded-lg">
          {/* Modal content */}
          <button onClick={closeModal}>Close</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

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
                  {/* Product list */}
                </div>
              </PopoverPanel>
            </Popover>
          </PopoverGroup>
        </nav>
      </header>

      {/* Main Gallery Content */}
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && <Modal isOpen={Boolean(photoId)} closeModal={() => setLastViewedPhoto(photoId)} />}
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
