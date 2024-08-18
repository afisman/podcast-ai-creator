import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { GenerateThumbnailProps } from '@/types';
import { Loader } from 'lucide-react';
import { Input } from './ui/input';




const GenerateThumbnail = ({ setImage, setImageStorageId, image, imagePrompt, setImagePrompt }: GenerateThumbnailProps) => {
    const [isAIThumbnail, setIsAIThumbnail] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const imageRef = useRef<HTMLInputElement>(null);

    const generateImage = async () => {

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
                                {isGenerating ? (
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
                        />

                    </div>
                )
            }
        </>
    )
}

export default GenerateThumbnail