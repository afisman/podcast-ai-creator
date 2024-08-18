import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { GenerateThumbnailProps } from '@/types';
import { Loader } from 'lucide-react';
import { Input } from './ui/input';
import Image from 'next/image';
import { useToast } from './ui/use-toast';
import { useMutation } from 'convex/react';
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import { api } from '@/convex/_generated/api';




const GenerateThumbnail = ({ setImage, setImageStorageId, image, imagePrompt, setImagePrompt }: GenerateThumbnailProps) => {
    const [isAIThumbnail, setIsAIThumbnail] = useState(true);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const imageRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const { startUpload } = useUploadFiles(generateUploadUrl);

    const getImageUrl = useMutation(api.podcasts.getUrl);



    const handleImage = async (blob: Blob, fileName: string) => {
        setIsImageLoading(true);
        setImage('');

        try {

            const file = new File([blob], fileName, { type: 'image/png' });
            const uploaded = await startUpload([file]);
            const storageId = (uploaded[0].response as any).storageId;
            setImageStorageId(storageId);

            const imageUrl = await getImageUrl({ storageId });
            setImage(imageUrl!);

            setIsImageLoading(false);
            toast({
                title: "Thumbnail generated successfullly!",
            })

        } catch (error) {
            console.log(error)
            toast({ title: 'Error generating thumbnail', variant: 'destructive' })
        }
    }

    const generateImage = async () => {

    }

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            const files = e.target.files;
            if (!files) return;
            const file = files[0];
            const blob = await file.arrayBuffer()
                .then((ab) => new Blob([ab]));

            handleImage(blob, file.name);

        } catch (error) {
            console.log(error);

        } toast({ title: 'Error uploading image', variant: 'destructive' })

    }

    return (
        <>
            <div className='generate_thumbnail'>
                <Button
                    type='button'
                    variant='plain'
                    onClick={() => setIsAIThumbnail(true)}
                    className={cn('', {
                        'bg-blac-6': isAIThumbnail
                    })}
                >
                    Use AI to generate thumbnail
                </Button>
                <Button
                    type='button'
                    variant='plain'
                    onClick={() => setIsAIThumbnail(false)}
                    className={cn('', {
                        'bg-blac-6': !isAIThumbnail
                    })}
                >
                    Upload custom image
                </Button>
            </div>
            {
                isAIThumbnail ? (
                    <div className='flex flex-col gap-5'>
                        <div className='mt-5 flex flex-col gap-2.5'>
                            <Label className='text-16 font-bold text-white-1'>
                                AI prompt to generate thumbnail
                            </Label>
                            <Textarea
                                className='input-class font-light focus-visible:ring-offset-orange-1'
                                placeholder='Provide text to generate thumbnail'
                                rows={5}
                                value={imagePrompt}
                                onChange={(e) => setImagePrompt(e.target.value)}
                            />
                        </div>
                        <div className='w-full max-w-[200px]'>
                            <Button type="submit"
                                className="text-16 bg-orange-1 py-4 font-bold text-white-1"
                                onClick={generateImage}
                            >
                                {isImageLoading ? (
                                    <>
                                        Generating
                                        <Loader size={20} className="animate-spin ml-2" />
                                    </>
                                )
                                    :
                                    "Generate thumbnail"
                                }

                            </Button>
                        </div>
                    </div>

                ) : (
                    <div className='image_div' onClick={() => imageRef?.current?.click()}>
                        <Input
                            type='file'
                            className='hidden'
                            ref={imageRef}
                            onChange={(e) => uploadImage(e)}
                        />
                        {!isImageLoading ? (
                            <Image
                                src="/icons/upload-image.svg"
                                width={40}
                                height={40}
                                alt='upload'
                            />
                        ) : (
                            <div className='text-16 flex-centrer font-medium text-white-1'>
                                Uploading
                                <Loader size={20} className="animate-spin ml-2" />
                            </div>
                        )}
                        <div className='flex flex-col items-center gap-1'>
                            <h2 className='text-12 text-bold text-orange-1'>Click to upload</h2>
                            <p className='text-12 text-normal text-gray-1'>SVG, JPG or GIF( max.1080x1080px)</p>
                        </div>
                    </div>
                )}
            {image && (
                <div className='flex-center w-full'>
                    <Image
                        src={image}
                        width={200}
                        height={200}
                        className='mt-5'
                        alt='Thumbnail'
                    />
                </div>
            )}
        </>
    )
}

export default GenerateThumbnail