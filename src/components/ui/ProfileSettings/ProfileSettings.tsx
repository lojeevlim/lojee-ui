import { useState } from "react";
import type { FormEvent } from "react";
import { cx } from "../../../core/tokens";
import { Label } from "../Label/Label";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Buttons/Button";
import { Avatar } from "../Avatar/Avatar";

export interface ProfileSettingsValues {
  name: string;
  username: string;
  bio: string;
}

// Fixed field shape, not compound children — same reasoning as every other
// *Form component in this library: it composes existing primitives
// internally rather than accepting arbitrary field children, so it works
// identically once wrapped as a Web Component.
export interface ProfileSettingsProps {
  /** Initial field values — internally stateful from there, like every other *Form component here. */
  defaultValues?: Partial<ProfileSettingsValues>;
  avatarSrc?: string;
  avatarInitials?: string;
  onSave?: (values: ProfileSettingsValues) => void;
  /** Fires when "Change photo" is clicked — this component doesn't handle file upload itself. */
  onAvatarChange?: () => void;
  saveLabel?: string;
  className?: string;
  classNames?: { root?: string; header?: string; field?: string };
}

export function ProfileSettings({
  defaultValues,
  avatarSrc,
  avatarInitials,
  onSave,
  onAvatarChange,
  saveLabel = "Save changes",
  className,
  classNames,
}: ProfileSettingsProps) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [username, setUsername] = useState(defaultValues?.username ?? "");
  const [bio, setBio] = useState(defaultValues?.bio ?? "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave?.({ name, username, bio });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cx("rounded-xl border border-slate-200 bg-white p-6", className, classNames?.root)}
    >
      <div className={cx("mb-6 flex items-center gap-4", classNames?.header)}>
        <Avatar src={avatarSrc} initials={avatarInitials} size="xl" />
        <Button type="button" variant="outline" size="sm" label="Change photo" onClick={onAvatarChange} />
      </div>

      <div className={cx("space-y-4", classNames?.field)}>
        <div>
          <Label htmlFor="profile-settings-name">Display name</Label>
          <div className="mt-1.5">
            <Input id="profile-settings-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Diaz" />
          </div>
        </div>

        <div>
          <Label htmlFor="profile-settings-username">Username</Label>
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-sm text-slate-400">@</span>
            <Input
              id="profile-settings-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="jordandiaz"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="profile-settings-bio">Bio</Label>
          <div className="mt-1.5">
            <Textarea
              id="profile-settings-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell people a little about yourself."
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button type="submit" label={saveLabel} />
      </div>
    </form>
  );
}
