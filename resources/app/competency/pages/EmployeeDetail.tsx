import * as React from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";

import { LoadingFallback } from "@src/components/fallbacks";
import { cn } from "@src/lib/styling";
import { Avatar, AvatarFallback, AvatarImage } from "@src/ui/avatar";
import { Button } from "@src/ui/button";
import { Tab, Tabs, TabsContent, TabsList } from "@src/ui/tabs";

import { AssessmentTable } from "../components/AssessmentTable";
import { BottomNavLeader } from "../components/BottomNavLeader";
import { StatusBadge } from "../components/StatusBadge";
import { useEmployeeDetail } from "../hooks/useEmployeeDetail";

export function EmployeeDetail() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useEmployeeDetail(employeeId!);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="text-red-600">
          {error instanceof Error
            ? error.message
            : "Data karyawan tidak tersedia untuk demo"}
        </div>
        <Button onClick={() => navigate(-1)}>Kembali</Button>
      </div>
    );
  }

  const {
    employee,
    assessment_results,
    work_history,
    education,
    achievement,
    kpi_personal,
  } = data;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Back Button */}
      <div className="bg-white flex items-center gap-2 p-4 shadow-sm">
        <Button variant="ghost" onClick={() => navigate(-1)} className="p-2">
          <IconArrowLeft size={20} className="text-gray-900" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">{employee.nama}</h1>
      </div>

      {/* Employee Profile Card */}
      <div className="bg-white mb-4 p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <Avatar className="mb-3 h-24 w-24">
            <AvatarImage
              src={employee.photo || "https://i.pravatar.cc/150"}
              alt={employee.nama}
            />
            <AvatarFallback className="text-gray-900">
              {employee.nama.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">
              {employee.nama}
            </div>
            <div className="text-sm text-gray-600">{employee.jabatan}</div>
            <div className="text-sm text-gray-500">{employee.fungsi}</div>
            <div className="text-xs text-gray-500">{employee.level}</div>
            <div className="mt-2">
              <StatusBadge status={employee.status_kompetensi} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm">
        <Tabs defaultValue="assessment" className="w-full">
          <TabsList className="w-full overflow-x-auto">
            <Tab value="assessment">Hasil Assessment</Tab>
            <Tab value="work-history">Riwayat Kerja</Tab>
            <Tab value="education">Pendidikan</Tab>
            <Tab value="training">Training</Tab>
            <Tab value="competency">Kompetensi</Tab>
            <Tab value="qualification">Kualifikasi</Tab>
            <Tab value="achievement">Achievement</Tab>
            <Tab value="kpi">KPI Personal</Tab>
          </TabsList>

          <TabsContent value="assessment" className="p-4">
            <div className="bg-white mb-4 rounded-lg p-4 shadow-sm">
              <div className="font-semibold">Hasil Assessment</div>
              <div className="text-sm text-gray-600">
                Terakhir diupdate: {assessment_results.assessed_date}
              </div>
              {assessment_results.assessor && (
                <div className="text-xs text-gray-500">
                  Assessor: {assessment_results.assessor}
                </div>
              )}
            </div>
            <AssessmentTable assessments={assessment_results.assessments} />
          </TabsContent>

          <TabsContent value="work-history" className="p-4">
            <div className="space-y-3">
              {work_history && work_history.length > 0 ? (
                work_history.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                  >
                    <div className="font-semibold">{item.position}</div>
                    <div className="text-sm text-gray-600">
                      {item.department}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.start_date} - {item.end_date || "Sekarang"}
                    </div>
                    <div className="mt-2 text-sm">{item.description}</div>
                    {item.achievements && item.achievements.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs font-semibold">
                          Achievements:
                        </div>
                        <ul className="list-inside list-disc text-xs">
                          {item.achievements.map((ach, idx) => (
                            <li key={idx}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                  Tidak ada data riwayat pekerjaan
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="education" className="p-4">
            <div className="space-y-3">
              {education && education.length > 0 ? (
                education.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                  >
                    <div className="font-semibold">{item.degree}</div>
                    <div className="text-sm text-gray-600">
                      {item.institution}
                    </div>
                    <div className="text-sm text-gray-500">{item.major}</div>
                    <div className="text-xs text-gray-500">
                      {item.year_start} - {item.year_end}
                    </div>
                    {item.gpa && (
                      <div className="mt-1 text-sm">GPA: {item.gpa}</div>
                    )}
                    {item.description && (
                      <div className="mt-2 text-sm text-gray-600">
                        {item.description}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                  Tidak ada data pendidikan
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="achievement" className="p-4">
            <div className="space-y-3">
              {achievement && achievement.length > 0 ? (
                achievement.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.date}</div>
                      </div>
                      <span className="rounded-full bg-kf-orange/10 px-2 py-1 text-xs text-kf-orange">
                        {item.category}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {item.description}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Awarded by: {item.awarded_by}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                  Tidak ada data achievement
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="kpi" className="p-4">
            <div className="space-y-3">
              {kpi_personal && kpi_personal.length > 0 ? (
                kpi_personal.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.category}
                        </div>
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-xs font-semibold",
                          item.status === "Exceed" &&
                            "bg-blue-100 text-blue-800",
                          item.status === "Achieved" &&
                            "bg-green-100 text-green-800",
                          item.status === "Not Achieved" &&
                            "bg-red-100 text-red-800",
                        )}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <div>
                        <span className="text-gray-600">Target: </span>
                        <span className="font-medium">{item.target}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Actual: </span>
                        <span className="font-medium">{item.actual}</span>
                      </div>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Period: {item.period}
                    </div>
                    {item.notes && (
                      <div className="mt-2 text-xs text-gray-600">
                        {item.notes}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                  Tidak ada data KPI personal
                </div>
              )}
            </div>
          </TabsContent>

          {/* Placeholder tabs */}
          <TabsContent value="training" className="p-4">
            <div className="bg-white rounded-lg p-8 text-center text-gray-500 shadow-sm">
              Data Training akan ditampilkan di sini
            </div>
          </TabsContent>

          <TabsContent value="competency" className="p-4">
            <div className="bg-white rounded-lg p-8 text-center text-gray-500 shadow-sm">
              Data Kompetensi akan ditampilkan di sini
            </div>
          </TabsContent>

          <TabsContent value="qualification" className="p-4">
            <div className="bg-white rounded-lg p-8 text-center text-gray-500 shadow-sm">
              Data Kualifikasi akan ditampilkan di sini
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavLeader />
    </div>
  );
}
