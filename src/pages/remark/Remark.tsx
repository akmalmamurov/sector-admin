import { CommentList } from '@/components/tab-list/CommentList';
import { useGetComment } from '@/hooks/remark/get-comment';
import { memo  } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useCurrentColor } from '@/hooks/useCurrentColor';
import classNames from 'classnames';
import { remarkTabHeader } from '@/data/tab-header';

const Remark = () => {
    const { data: commentData = [], isLoading, error: commentError } = useGetComment();

    const tablist = [
        {
            value: "comment",
            item: <CommentList commentData={commentData} isLoading={isLoading} error={commentError as Error} />
        },
        // {
        //     value: "question",
        //     item: <QuestionList />
        // }
    ]
    const theme = useCurrentColor();
  return (
      <div >
        <Tabs defaultValue="comment" className="w-full">
            <TabsList className={classNames(
                "h-[42px] p-1 font-sans relative gap-7",
                theme.tabBg
            )}>
                {remarkTabHeader.map((el) => (
                    <TabsTrigger key={el} value={el} className={classNames(
                        "px-5 h-full text-base font-normal py-0 capitalize",
                        theme.text
                    )}>{el}</TabsTrigger>
                ))}
            </TabsList>

            <div className='mt-5'>
                {tablist.map((el) => (
                    <TabsContent key={el.value} value={el.value} className="p-0">
                        {el.item}
                    </TabsContent>
                ))}
            </div>
        </Tabs>
      </div>
  )
}

export default memo(Remark)
