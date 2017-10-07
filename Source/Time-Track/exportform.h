#ifndef EXPORTFORM_H
#define EXPORTFORM_H

#include <QDialog>
#include <QtSql>
namespace Ui {
class ExportForm;
}

class ExportForm : public QDialog
{
    Q_OBJECT

public:
    explicit ExportForm(QWidget *parent = 0);
    ~ExportForm();
    Ui::ExportForm *ui;
    QString Location;
    QString Table;
    QString Name;
    QDate To;
    QDate From;

signals:
    void excel();


private slots:
    void on_ExcelLocationChange_clicked();
    void on_buttonBox_accepted();
    void EmployeeInitialize();

    void on_ExcelTableChange_currentTextChanged(const QString &arg1);

private:

    QSqlDatabase data;

};

#endif // EXPORTFORM_H
