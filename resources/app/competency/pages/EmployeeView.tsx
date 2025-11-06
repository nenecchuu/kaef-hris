import * as React from "react";
import {
  IconArrowLeft,
  IconCalendar,
  IconMail,
  IconPhone,
  IconBuilding,
  IconAward,
  IconBookmark,
  IconTrendingUp,
  IconTarget,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";

import { LoadingFallback } from "@src/components/fallbacks";
import { cn } from "@src/lib/styling";
import { Avatar, AvatarFallback, AvatarImage } from "@src/ui/avatar";
import { Button } from "@src/ui/button";
import { Tab, Tabs, TabsContent, TabsList } from "@src/ui/tabs";
import { Progress } from "@src/ui/progress";

import { BottomNavLeader } from "../components/BottomNavLeader";
import { StatusBadge } from "../components/StatusBadge";
import { AssessmentTable } from "../components/AssessmentTable";
import { useEmployeeDetail } from "../hooks/useEmployeeDetail";

export function EmployeeView() {
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
            : "Data karyawan tidak tersedia"}
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
    training,
    personal_qualification,
    achievement,
    kpi_personal,
  } = data;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-kf-blue to-kf-blue-dark text-gray-50 p-4 shadow-md">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 p-2 text-gray-50 hover:bg-white/20"
        >
          <IconArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">Profil Saya</h1>
        <p className="text-sm text-gray-50/80">Self-Service Dashboard</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white m-4 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <Avatar className="mb-4 h-32 w-32 border-4 border-kf-blue/20">
            <AvatarImage src={employee.photo} alt={employee.nama} />
            <AvatarFallback className="bg-kf-blue text-gray-50 text-3xl font-bold">
              {employee.nama.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{employee.nama}</h2>
            <p className="text-sm font-semibold text-kf-blue">{employee.jabatan}</p>
            <p className="text-xs text-gray-600">{employee.fungsi}</p>
          </div>

          <StatusBadge status={employee.status_kompetensi} />

          {/* Fit Rate Score */}
          <div className="mt-6 w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Overall Fit Rate
              </span>
              <span className="text-lg font-bold text-kf-blue">
                {employee.fit_rate_overall}%
              </span>
            </div>
            <Progress
              value={employee.fit_rate_overall}
              className="h-3"
            />
          </div>
        </div>

        {/* Contact & Basic Info */}
        <div className="mt-6 space-y-3 border-t pt-4">
          <div className="flex items-center gap-3 text-sm">
            <IconMail size={18} className="text-gray-600" />
            <span className="text-gray-700">{employee.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <IconPhone size={18} className="text-gray-600" />
            <span className="text-gray-700">{employee.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <IconBuilding size={18} className="text-gray-600" />
            <span className="text-gray-700">{employee.department}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <IconCalendar size={18} className="text-gray-600" />
            <span className="text-gray-700">
              Bergabung: {new Date(employee.join_date).toLocaleDateString("id-ID")}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mx-4">
        <Tabs defaultValue="assessment" className="w-full">
          <TabsList className="w-full grid grid-cols-4 gap-1">
            <Tab value="assessment" className="text-xs">
              Assessment
            </Tab>
            <Tab value="career" className="text-xs">
              Karir
            </Tab>
            <Tab value="training" className="text-xs">
              Training
            </Tab>
            <Tab value="achievements" className="text-xs">
              Pencapaian
            </Tab>
          </TabsList>

          {/* Assessment Tab */}
          <TabsContent value="assessment" className="space-y-4 pt-4">
            {assessment_results?.assessments?.map((assessment) => (
              <div
                key={assessment.kategori}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">
                    {assessment.kategori}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-kf-blue">
                      {assessment.fit_rate}%
                    </span>
                    <StatusBadge status={assessment.status} />
                  </div>
                </div>

                <div className="flex gap-2 text-xs mb-3">
                  <div className="flex-1">
                    <div className="text-gray-600">Expected Avg</div>
                    <div className="font-bold text-gray-900">
                      {assessment.expected.toFixed(1)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-600">Actual Avg</div>
                    <div className="font-bold text-gray-900">
                      {assessment.actual_avg.toFixed(2)}
                    </div>
                  </div>
                </div>

                <Progress
                  value={assessment.fit_rate}
                  className="mb-3"
                />

                {/* Individual Items */}
                <div className="space-y-2 mt-3 border-t pt-3">
                  {assessment.items.map((item) => (
                    <div
                      key={item.nama}
                      className="flex items-center justify-between text-xs"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.nama}</p>
                        <p className="text-gray-600">
                          {item.actual}/{item.expected}
                          {item.gap !== 0 && (
                            <span className={item.status === "gap" ? "text-red-600" : "text-green-600"}>
                              {" "}
                              ({item.gap > 0 ? "+" : ""}{item.gap})
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <StatusBadge status={item.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Career Tab */}
          <TabsContent value="career" className="space-y-4 pt-4">
            {/* Work History */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900 flex items-center gap-2">
                <IconTrendingUp size={18} className="text-kf-blue" />
                Riwayat Kerja
              </h3>
              <div className="space-y-3">
                {work_history?.map((wh) => (
                  <div key={wh.id} className="border-l-2 border-kf-blue pl-3">
                    <h4 className="font-semibold text-gray-900">{wh.position}</h4>
                    <p className="text-xs text-gray-600">{wh.department}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(wh.start_date).toLocaleDateString("id-ID")} -{" "}
                      {wh.is_current
                        ? "Sekarang"
                        : new Date(wh.end_date!).toLocaleDateString("id-ID")}
                    </p>
                    {wh.description && (
                      <p className="mt-2 text-xs text-gray-700 italic">
                        {wh.description}
                      </p>
                    )}
                    {wh.achievements?.length > 0 && (
                      <ul className="mt-2 list-disc list-inside space-y-1 text-xs text-gray-600">
                        {wh.achievements.map((ach, idx) => (
                          <li key={idx}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900 flex items-center gap-2">
                <IconBookmark size={18} className="text-kf-blue" />
                Pendidikan
              </h3>
              <div className="space-y-3">
                {education?.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-kf-orange pl-3">
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">
                      {edu.major} ({edu.year_start} - {edu.year_end})
                    </p>
                    {edu.gpa && (
                      <p className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            {personal_qualification?.length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="mb-4 font-semibold text-gray-900 flex items-center gap-2">
                  <IconTarget size={18} className="text-kf-blue" />
                  Kualifikasi Profesional
                </h3>
                <div className="space-y-2">
                  {personal_qualification.map((qual) => (
                    <div key={qual.id} className="text-sm">
                      <p className="font-semibold text-gray-900">{qual.name}</p>
                      <p className="text-xs text-gray-600">
                        {qual.issuer} • Diterbitkan:{" "}
                        {new Date(qual.issued_date).toLocaleDateString("id-ID")}
                      </p>
                      {qual.expiry_date && (
                        <p className="text-xs text-gray-600">
                          Berlaku sampai:{" "}
                          {new Date(qual.expiry_date).toLocaleDateString("id-ID")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-4 pt-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="mb-4 font-semibold text-gray-900">Riwayat Pelatihan</h3>
              <div className="space-y-3">
                {training?.map((trn) => (
                  <div
                    key={trn.id}
                    className="border-l-4 border-green-500 pl-3 pb-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {trn.title}
                        </h4>
                        <p className="text-xs text-gray-600">{trn.provider}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(trn.date).toLocaleDateString("id-ID")} •{" "}
                          {trn.duration}
                        </p>
                      </div>
                      <span className="ml-2 inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        {trn.status}
                      </span>
                    </div>
                    {trn.certificate_number && (
                      <p className="mt-1 text-xs text-gray-600">
                        Sertifikat: {trn.certificate_number}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4 pt-4">
            {/* KPI Personal */}
            {kpi_personal?.length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="mb-4 font-semibold text-gray-900 flex items-center gap-2">
                  <IconTarget size={18} className="text-kf-blue" />
                  KPI Personal
                </h3>
                <div className="space-y-3">
                  {kpi_personal.map((kpi) => (
                    <div key={kpi.id} className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {kpi.name}
                        </h4>
                        <StatusBadge status={kpi.status as any} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                        <div>
                          <p className="text-gray-600">Target</p>
                          <p className="font-semibold text-gray-900">
                            {kpi.target}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Actual</p>
                          <p className="font-semibold text-gray-900">
                            {kpi.actual}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">
                        {kpi.period} • {kpi.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {achievement?.length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="mb-4 font-semibold text-gray-900 flex items-center gap-2">
                  <IconAward size={18} className="text-kf-blue" />
                  Pencapaian & Penghargaan
                </h3>
                <div className="space-y-3">
                  {achievement.map((ach) => (
                    <div key={ach.id} className="border-l-4 border-yellow-500 pl-3">
                      <h4 className="font-semibold text-gray-900">{ach.title}</h4>
                      <p className="text-xs text-gray-600">{ach.category}</p>
                      <p className="mt-1 text-xs text-gray-700">
                        {ach.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(ach.date).toLocaleDateString("id-ID")} •{" "}
                        {ach.awarded_by}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Nav */}
      <BottomNavLeader />
    </div>
  );
}

export default EmployeeView;
