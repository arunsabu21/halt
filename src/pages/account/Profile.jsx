import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, CalendarDays, User } from "lucide-react";
import { getCurrentUser } from "../../services/auth";
import { formatDate } from "../../utils/formatDate";
import getErrorMessage from "../../utils/getErrorMessage";
import PageLoader from "../../components/common/PageLoader";
import EmptyState from "../../components/common/EmptyState";
import NotFound from "../../assets/not-found.svg";
import "../../styles/Profile.css";

function Profile() {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["whoami"],
    queryFn: getCurrentUser,
  });

  if (isLoading) return <PageLoader />;

  if (isError) {
    return (
      <EmptyState
        image={NotFound}
        imageAlt="Something went wrong"
        title="Something went wrong"
        message={getErrorMessage(error)}
      />
    );
  }

  const initials = user.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : user.email[0].toUpperCase();

  return (
    <div className="profile-page">
      <h1 className="profile-title">Profile</h1>

      <div className="profile-card">
        <div className="profile-avatar">{initials}</div>

        <div className="profile-info">
          <h2 className="profile-name">{user.full_name || "—"}</h2>
          <p className="profile-joined">
            <CalendarDays size={13} /> Joined {formatDate(user.created_at)}
          </p>
        </div>
      </div>

      <div className="detail-panel">
        <h3 className="detail-panel-title">Account Details</h3>

        <div className="detail-row">
          <span className="detail-row-label">
            <User size={14} /> Full Name
          </span>
          <span className="detail-row-value">{user.full_name || "—"}</span>
        </div>

        <div className="detail-row">
          <span className="detail-row-label">
            <Mail size={14} /> Email
          </span>
          <span className="detail-row-value">{user.email}</span>
        </div>

        <div className="detail-row">
          <span className="detail-row-label">
            <Phone size={14} /> Phone Number
          </span>
          <span className="detail-row-value">{user.phone_number || "—"}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
