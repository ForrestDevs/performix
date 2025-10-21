import { MediaBlock } from '@/payload/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/payload/blocks/Code/Component'

import type {
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { CallToActionBlock } from '@/payload/blocks/CallToAction/Component'
import { cn } from '@/lib/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'articles' ? `/articles/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText({
  className,
  enableProse = true,
  enableGutter = true,
  ...rest
}: Props) {
  // Remove grid/col-* classes from the wrapper to avoid layout issues with prose
  // Filter out any grid/flex classes that might interfere with prose layout
  const filteredClassName = className
    ?.replace(/\b(grid|flex|col-\w+|row-\w+|grid-cols-\w+|grid-rows-\w+)\b/g, '')
    .trim()

  const wrapperClassName = cn(
    // Force block display to prevent layout conflicts
    'block w-full',
    {
      container: enableGutter,
      'max-w-none': !enableGutter,
      // Use responsive prose utility, but override max-width when gutter is enabled
      prose: enableProse,
      'prose-base lg:prose-lg xl:prose-xl': enableProse && !enableGutter,
      'mx-auto': enableProse && enableGutter,
    },
    filteredClassName,
  )

  return <RichTextWithoutBlocks converters={jsxConverters} className={wrapperClassName} {...rest} disableIndent={true} />
}
