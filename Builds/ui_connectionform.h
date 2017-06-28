/********************************************************************************
** Form generated from reading UI file 'connectionform.ui'
**
** Created by: Qt User Interface Compiler version 5.9.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_CONNECTIONFORM_H
#define UI_CONNECTIONFORM_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QDialog>
#include <QtWidgets/QGridLayout>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QProgressBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QSpacerItem>

QT_BEGIN_NAMESPACE

class Ui_ConnectionForm
{
public:
    QGridLayout *gridLayout;
    QLabel *label_5;
    QLineEdit *databaseEdit;
    QLabel *label_6;
    QProgressBar *progress;
    QLineEdit *passwordEdit;
    QSpacerItem *verticalSpacer;
    QLabel *label_3;
    QLineEdit *usernameEdit;
    QLabel *label_4;
    QLineEdit *portEdit;
    QHBoxLayout *horizontalLayout_2;
    QLineEdit *ipEdit;
    QPushButton *testConnection;
    QLabel *label_2;
    QHBoxLayout *horizontalLayout;
    QLabel *error;
    QSpacerItem *horizontalSpacer;
    QPushButton *connect;

    void setupUi(QDialog *ConnectionForm)
    {
        if (ConnectionForm->objectName().isEmpty())
            ConnectionForm->setObjectName(QStringLiteral("ConnectionForm"));
        ConnectionForm->resize(395, 261);
        ConnectionForm->setStyleSheet(QLatin1String("QWidget#ConnectionForm{\n"
"\n"
"background-color:#E7EBE9;\n"
"}\n"
"*{\n"
"font-family:\"Calibri\";\n"
"font-size: 16px;\n"
"color:#263544;\n"
"\n"
"}\n"
"QPushButton{\n"
"padding:3px;\n"
"border:none;\n"
"background-color:#F1F4F5;\n"
"}\n"
"QPushButton:hover,QPushButton:hover{\n"
"background-color:#E4E9EB;\n"
"}\n"
"QLineEdit{ \n"
"background-color:#F1F4F5;\n"
"border: 0px solid 263544; \n"
"margin: 4px;\n"
"\n"
"}\n"
"QLineEdit:hover{ \n"
"background-color:#F1F4F5;\n"
"border: 1px solid 263544; \n"
"}\n"
"\n"
"\n"
""));
        gridLayout = new QGridLayout(ConnectionForm);
        gridLayout->setObjectName(QStringLiteral("gridLayout"));
        label_5 = new QLabel(ConnectionForm);
        label_5->setObjectName(QStringLiteral("label_5"));

        gridLayout->addWidget(label_5, 0, 0, 1, 2);

        databaseEdit = new QLineEdit(ConnectionForm);
        databaseEdit->setObjectName(QStringLiteral("databaseEdit"));

        gridLayout->addWidget(databaseEdit, 0, 2, 1, 2);

        label_6 = new QLabel(ConnectionForm);
        label_6->setObjectName(QStringLiteral("label_6"));

        gridLayout->addWidget(label_6, 1, 0, 1, 1);

        progress = new QProgressBar(ConnectionForm);
        progress->setObjectName(QStringLiteral("progress"));
        progress->setValue(0);
        progress->setOrientation(Qt::Horizontal);
        progress->setInvertedAppearance(false);

        gridLayout->addWidget(progress, 10, 0, 1, 3);

        passwordEdit = new QLineEdit(ConnectionForm);
        passwordEdit->setObjectName(QStringLiteral("passwordEdit"));
        passwordEdit->setEchoMode(QLineEdit::Password);

        gridLayout->addWidget(passwordEdit, 3, 2, 1, 2);

        verticalSpacer = new QSpacerItem(20, 40, QSizePolicy::Minimum, QSizePolicy::Expanding);

        gridLayout->addItem(verticalSpacer, 6, 2, 1, 2);

        label_3 = new QLabel(ConnectionForm);
        label_3->setObjectName(QStringLiteral("label_3"));

        gridLayout->addWidget(label_3, 3, 0, 1, 2);

        usernameEdit = new QLineEdit(ConnectionForm);
        usernameEdit->setObjectName(QStringLiteral("usernameEdit"));

        gridLayout->addWidget(usernameEdit, 2, 2, 1, 2);

        label_4 = new QLabel(ConnectionForm);
        label_4->setObjectName(QStringLiteral("label_4"));

        gridLayout->addWidget(label_4, 2, 0, 1, 2);

        portEdit = new QLineEdit(ConnectionForm);
        portEdit->setObjectName(QStringLiteral("portEdit"));

        gridLayout->addWidget(portEdit, 1, 2, 1, 2);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        ipEdit = new QLineEdit(ConnectionForm);
        ipEdit->setObjectName(QStringLiteral("ipEdit"));

        horizontalLayout_2->addWidget(ipEdit);

        testConnection = new QPushButton(ConnectionForm);
        testConnection->setObjectName(QStringLiteral("testConnection"));

        horizontalLayout_2->addWidget(testConnection);


        gridLayout->addLayout(horizontalLayout_2, 4, 2, 1, 1);

        label_2 = new QLabel(ConnectionForm);
        label_2->setObjectName(QStringLiteral("label_2"));

        gridLayout->addWidget(label_2, 4, 0, 1, 1);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        horizontalLayout->setSizeConstraint(QLayout::SetFixedSize);
        error = new QLabel(ConnectionForm);
        error->setObjectName(QStringLiteral("error"));
        error->setMaximumSize(QSize(16777215, 25));

        horizontalLayout->addWidget(error);

        horizontalSpacer = new QSpacerItem(40, 20, QSizePolicy::Expanding, QSizePolicy::Minimum);

        horizontalLayout->addItem(horizontalSpacer);

        connect = new QPushButton(ConnectionForm);
        connect->setObjectName(QStringLiteral("connect"));

        horizontalLayout->addWidget(connect);


        gridLayout->addLayout(horizontalLayout, 9, 0, 1, 3);

        QWidget::setTabOrder(databaseEdit, portEdit);
        QWidget::setTabOrder(portEdit, usernameEdit);
        QWidget::setTabOrder(usernameEdit, passwordEdit);
        QWidget::setTabOrder(passwordEdit, ipEdit);

        retranslateUi(ConnectionForm);

        QMetaObject::connectSlotsByName(ConnectionForm);
    } // setupUi

    void retranslateUi(QDialog *ConnectionForm)
    {
        ConnectionForm->setWindowTitle(QApplication::translate("ConnectionForm", "Connection Setup", Q_NULLPTR));
        label_5->setText(QApplication::translate("ConnectionForm", "Database:", Q_NULLPTR));
        label_6->setText(QApplication::translate("ConnectionForm", "Port:", Q_NULLPTR));
        progress->setFormat(QString());
        label_3->setText(QApplication::translate("ConnectionForm", "Password:", Q_NULLPTR));
        label_4->setText(QApplication::translate("ConnectionForm", "Username:", Q_NULLPTR));
        testConnection->setText(QApplication::translate("ConnectionForm", "?", Q_NULLPTR));
        label_2->setText(QApplication::translate("ConnectionForm", "IP:", Q_NULLPTR));
        error->setText(QString());
        connect->setText(QApplication::translate("ConnectionForm", "Connect", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class ConnectionForm: public Ui_ConnectionForm {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_CONNECTIONFORM_H
