#ifndef CONNECTIONFORM_H
#define CONNECTIONFORM_H

#include <QDialog>

namespace Ui {
class ConnectionForm;
}

class ConnectionForm : public QDialog
{
    Q_OBJECT

public:
    explicit ConnectionForm(QWidget *parent = 0);
    ~ConnectionForm();

    QString getConnectionName();

private slots:
    void on_buttonBox_accepted();
    void on_buttonBox_rejected();

signals:
    void finished();

private:
    Ui::ConnectionForm *ui;
};

#endif // CONNECTIONFORM_H
