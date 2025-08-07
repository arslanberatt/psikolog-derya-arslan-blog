import { LuReply, LuSend } from "react-icons/lu";
import Input from "../../components/Inputs/Input";
import CharAvatar from "../Cards/CharAvatar";

const CommentReplyInput = ({
  user,
  authorName,
  content,
  replytext,
  setReplyText,
  handleAddReply,
  handleCancelReply,
  type = "yanit",
}) => {
  return (
    <div className="mt-5 ml-10 relative">
      <div className="flex items-start gap-3">
        <CharAvatar
          fullName={user.profileImageUrl || ""}
          width="w-10"
          height="h-10"
          style="rounded-full object-cover"
        />
        <div className="flex-1">
          <Input
            value={replytext}
            onChange={({ target }) => setReplyText(target.value)}
            label={type == "yeni" ? authorName : "Yanıtla"}
            placeholder={type == "yeni" ? "Mesaj" : "Yanıt ekle"}
            type="text"
            className="bg-amber-400"
          />
          <div className="flex items-center justify-end gap-4">
            <button
              className="flex items-center text-[14px] text-gray-500 bg-gray-100 px-4 py-0.5 rounded-full hover:bg-gray-800 hover:text-white cursor-pointer"
              onClick={handleCancelReply}
            >
              İptal
            </button>
            <button
              className={`flex items-center gap-1.5 text-[14px] px-4 py-0.5 rounded-full text-sky-600 bg-sky-100 hover:bg-sky-500 hover:text-white cursor-pointer`}
              disabled={replytext?.length == 0}
              onClick={handleAddReply}
            >
              {type == "yeni" ? (
                <LuSend className="text-[13px]" />
              ) : (
                <LuReply className="text-[13px]" />
              )}
              {type == "yeni" ? "Ekle" : "Yanıtla"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentReplyInput;
