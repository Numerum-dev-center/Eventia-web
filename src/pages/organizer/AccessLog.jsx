import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ClipboardList, XCircle } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import DataToolbar from "../../components/ui/DataToolbar";
import { fetchAccessLog } from "../../services/eventsApiService";
import Skeleton from "../../components/ui/Skeleton";

function AccessLog() {
  const { id } = useParams();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const visibleScans = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("fr");
    if (!query) return scans;
    return scans.filter((scan) => [scan.estSucces ? "validé succès" : "refusé échec", scan.messageErreur, scan.localisation].some((value) => String(value || "").toLocaleLowerCase("fr").includes(query)));
  }, [scans, search]);

  useEffect(() => {
    fetchAccessLog(id)
      .then(setScans)
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="apple-page space-y-6">
      <Link
        to={`/organizer/events/${id}`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500"
      >
        <ArrowLeft size={16} />
        Retour à l'événement
      </Link>

      <PageHeader
        title="Journal d'accès"
        subtitle="Historique des billets scannés à l'entrée."
        action={
          <Button as={Link} to={`/organizer/events/${id}/scan`} fullWidth={false}>
            Ouvrir le scanner
          </Button>
        }
      />

      {loading ? (
        <div className="space-y-5">
          <div className="apple-table-card" style={{ padding: 14 }}>
            <div className="apple-data-toolbar">
              <Skeleton className="evi-skeleton-toolbar" width="170px" height="36px" />
              <div className="apple-data-toolbar-meta" style={{ gap: 8 }}>
                <Skeleton className="evi-skeleton-chip" width="78px" height="12px" />
                <Skeleton className="evi-skeleton-chip" width="95px" height="12px" />
              </div>
            </div>
            <div className="admin-checkin-panel" style={{ marginTop: 14 }}>
              <Skeleton width="100%" height="14px" />
            </div>
          </div>

          <div className="apple-table-card">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="74px" height="12px" /></th>
                  <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="54px" height="12px" /></th>
                  <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="76px" height="12px" /></th>
                  <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="40px" height="12px" /></th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 6 }).map((_, index) => (
                  <tr key={`scan-skeleton-${index}`} className="border-b">
                    <td className="px-6 py-4"><Skeleton width="74px" height="14px" /></td>
                    <td className="px-6 py-4"><Skeleton width="86%" height="14px" /></td>
                    <td className="px-6 py-4"><Skeleton width="64px" height="14px" /></td>
                    <td className="px-6 py-4"><Skeleton width="96px" height="14px" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : scans.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="Aucun scan enregistré"
          description="Chaque billet validé à l'entrée apparaîtra ici avec l'heure, le point de contrôle et le résultat du scan."
          action={
            <Button as={Link} to={`/organizer/events/${id}/scan`} fullWidth={false}>
              Ouvrir le scanner
            </Button>
          }
        />
      ) : (
        <>
        <DataToolbar value={search} onChange={setSearch} placeholder="Rechercher dans les contrôles…" countLabel={`${visibleScans.length} passage${visibleScans.length > 1 ? "s" : ""}`} />
        {visibleScans.length === 0 ? <EmptyState icon={ClipboardList} title="Aucun résultat" description="Aucun passage ne correspond à cette recherche." /> : <div className="apple-table-card">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Résultat</th>
                <th className="px-6 py-4 text-left">Message</th>
                <th className="px-6 py-4 text-left">Point de contrôle</th>
                <th className="px-6 py-4 text-left">Heure</th>
              </tr>
            </thead>
            <tbody>
              {visibleScans.map((scan) => (
                <tr key={scan.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {scan.estSucces ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                        <CheckCircle2 size={16} />
                        Validé
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-red-500 text-sm font-medium">
                        <XCircle size={16} />
                        Refusé
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {scan.messageErreur || "Billet validé"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{scan.localisation}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(scan.createdAt).toLocaleString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
        </>
      )}
    </div>
  );
}

export default AccessLog;
