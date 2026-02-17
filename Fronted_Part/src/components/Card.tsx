import { ShareIcon } from "../icons/Share";

export function Card(){
    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-96 border">
        <div className="flex justify-between">

  <div className="flex items-center text-md">
    <div className="text-gray-500 pr-2">
      <ShareIcon />
    </div>
    Project ideas
  </div>

  <div className="flex items-center">
    <div className="pr-2 text-gray-500">
      <ShareIcon />
    </div>

    <div className="text-gray-500">
      <ShareIcon />
    </div>
  </div>

</div>
  <div className="pt-4">
  <iframe width="full" height="315" src="https://www.youtube.com/embed/RJKJ6nzlmR8?si=Ibyrqum7jxDjkWuX" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

   <blockquote className="twitter-tweet">
        <a href="https://twitter.com/elonmusk/status/1357236825589432322"></a>
      </blockquote>



  </div>
    </div>
    </div>
}